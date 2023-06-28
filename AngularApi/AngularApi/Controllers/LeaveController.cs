using AngularApi.Context;
using AngularApi.Helper;
using AngularApi.Models;
using AngularApi.UtilityService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System.Net.Mail;
using System.Security.Cryptography;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public LeaveController(AppDbContext context,IConfiguration configuration,IEmailService emailService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }
        [HttpPost("LeaveApplication")]
        public async Task<IActionResult> Apply([FromBody] Leave leaveObj)
        {
            if (leaveObj == null)
            {
                return BadRequest(new {message="Invalid request"});
            }
            var comp = await _context.Users.FirstOrDefaultAsync(a => a.Email == leaveObj.Email);
            if (comp == null)
            {
                return BadRequest("user email not found");
            }
            var compId = comp.CompanyId;
            var compInfo = await _context.Companies.FirstOrDefaultAsync(a => a.Id == compId);
            if (compInfo == null)
            {
                return BadRequest(new { message = "Company email not found in database" });
            }
            var email = compInfo?.Email;
            leaveObj.ApplicationDate = DateTime.Now;
            leaveObj.CompanyId = compId;
            leaveObj.CompanyName = email;
            await _context.Leaves.AddAsync(leaveObj);
            await _context.SaveChangesAsync();
            try
            {
                await SendApplication(email);



                return Ok(new
                {
                    message = "Leave application successful"
                });
            }catch(SmtpFailedRecipientException ex)
            {
                return BadRequest("Failed to send email message. Try again");
            }
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetApplications(string email)
        {
            var users = _context.Leaves.Where(a => a.Email == email).ToList();
            if (users == null)
            {
                return BadRequest("You dont have any applications" );
            }
            return Ok(new { message = users });

        }

        [HttpGet("get-application-by-id/{id}")]
        public async Task<ActionResult<User>> GetApplicationById(int id)
        {
            //var users = _context.Leaves.FirstOrDefaultAsync(a=>a.Id == id);
            var apps = _context.Leaves.Where(a => a.Id == id).ToList();
           // var apps = _context.Leaves.FirstOrDefault(a => a.Id == id);

            if (apps == null)
            {
                return BadRequest("Leave application not found" );
            }
            return Ok(new { message = apps });

        }
        [HttpGet("leave-applications/{email}")]

        public async Task<ActionResult<User>> GetApplication(string email)
        {
            var users = _context.Leaves.Where(a => a.CompanyName == email).ToList();
            if (users == null)
            {
                return BadRequest(new { message = "You dont have employees" });
            }
            return Ok(new { message = users });


        }
        [HttpPost("leave-application-email/{email}")]
        public async Task<IActionResult> SendApplication(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Email == email);
            if (user == null)
            {
                return NotFound("Email does not exist"
                );

            }
            var compId = user.CompanyId;
            var comp = await _context.Companies.FirstOrDefaultAsync(a => a.Id == compId);
            var cemail = comp.Email;
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ResetPasswordToken = emailToken;
            user.ResetPasswordExpiry = DateTime.Now.AddMinutes(20);
            string from = _configuration["EmailSettings:From"];
            var emailModel = new Email(cemail, "Leave application",
                LAEmailBody.EmailStringBody(cemail, emailToken));
            _emailService.SendEmail(emailModel);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                StatusCode = 200,
                Message = "Email Sent"
            });

        }
        [HttpPost("leave-email/{email}")]
        public async Task<IActionResult> SendApprov(string email,string applicantEmail,string leaveType,DateTime startDate,DateTime endDate)
        {
            var users = _context.Users.Where(a => a.CompanyName == email).ToList();
            foreach(var user in users)
            {
                //var compId = user.CompanyId;
                //var comp = await _context.Companies.FirstOrDefaultAsync(a => a.Id == compId);
                var tokenBytes = RandomNumberGenerator.GetBytes(64);
                var emailToken = Convert.ToBase64String(tokenBytes);
                // user.ResetPasswordToken = emailToken;
                // user.ResetPasswordExpiry = DateTime.Now.AddMinutes(20);
                string from = _configuration["EmailSettings:From"];
                var emailModel = new Email(user.Email, "Leave app",
                    LAPEmailBody.EmailStringBody(user.Email, emailToken,applicantEmail,leaveType,startDate,endDate));
                _emailService.SendEmail(emailModel);
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
           

            return Ok(new
            {
                StatusCode = 200,
                Message = "Email Sent"
            });

        }

        [HttpPost("leave-application-approval")]
        public async Task<IActionResult> SendApproval(Leave leaveObj)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Email == leaveObj.Email);
            if (user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Email does not exist"
                });

            }
            var appl = await _context.Leaves.FirstOrDefaultAsync(a => a.Id == leaveObj.Id);
            appl.Status = "Approved";
            var days = (int)appl.EndDate.Value.Subtract(appl.StartDate.Value).TotalDays;
            user.TotalNumberOfLeaveDays = user.TotalNumberOfLeaveDays + days;
            
            
            appl.LeaveDaysTaken = days;
            _context.Entry(appl).State = EntityState.Modified;
            await _context.SaveChangesAsync();

             await Update(user.Email, days);
            
            try
            {
                SendApprov(leaveObj.CompanyName, leaveObj.Email, leaveObj.LeaveType, (DateTime)leaveObj.StartDate, (DateTime)leaveObj.EndDate);




                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Application has been approved"
                });
            } catch(SmtpFailedRecipientException ex)
            {
                return BadRequest("Failed to send email message. Try again");
            }

        }
        private async Task<ActionResult> Update(string email, int days)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Email == email);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            if (user.TotalHoursWorked == null)
            {
                user.TotalNumberOfLeaveDays = days;
            }
            else
            {
                user.TotalNumberOfLeaveDays = user.TotalNumberOfLeaveDays + days;
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            await _context.SaveChangesAsync();


            return Ok(new
            {
                message = "Check out successful"
            });
        }

    }
}
