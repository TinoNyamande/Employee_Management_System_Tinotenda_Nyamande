using AngularApi.Context;
using AngularApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerformanceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PerformanceController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("checkin")]
        public async Task<IActionResult> Checkin([FromBody] Performance pObj)
        {
            if (pObj == null)
            {
                return BadRequest(new { message = "Invalid object" });
            }
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Email == pObj.Email);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            var checkedin = await _context.Performances.FirstOrDefaultAsync(a=>a.Email == pObj.Email && a.Date == DateTime.Now.Date);
            if (checkedin != null)
            {
                return BadRequest("Employee has already checked in");
            }


           
            pObj.Date = DateTime.Now.Date;
            pObj.CheckinTime = DateTime.Now;
            

            await _context.Performances.AddAsync(pObj);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Check in successful"
            });
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<User>> MyPerformance(string email)
        {
            var users = _context.Performances.Where(a => a.Email == email).ToList();
            if (users == null)
            {
                return BadRequest(new { message = "No performances" });
            }
            return Ok(new { message = users });

        }

        [HttpGet("employees/{email}")]
        public async Task<ActionResult<User>> AllPerformance(string email)
        {
            var users = _context.Performances.Where(a => a.CompanyEmail == email).ToList();
            if (users == null)
            {
                return BadRequest(new { message = "You dont have any employees" });
            }
            return Ok(new { message = users });

        }



        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] Performance pObj)
        {
            var today = DateTime.Now;
            var row = await _context.Performances.FirstOrDefaultAsync(c=>c.Email == pObj.Email && c.Date == DateTime.Now.Date);
            var newrow = await _context.Performances.FirstOrDefaultAsync(c => c.Email == "tinotendanyamande0784@gmail.com");
            if (row == null)
            {
                return BadRequest("Employee did not check in");
            }
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Email == pObj.Email);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            
            row.WorkDone = pObj.WorkDone;
            row.CheckoutTime = DateTime.Now;
            var hours = (int)DateTime.Now.Subtract(row.CheckinTime).TotalMinutes;
           
            row.HoursWorked = hours;
            _context.Entry(row).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            await Update(pObj.Email, hours);

            return Ok(new
            {
                message = "Check out successful"
            });
        }
        private async Task<ActionResult> Update(string email, int hours)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Email == email);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            if (user.TotalHoursWorked == null)
            {
                user.TotalHoursWorked =  hours;
            }
            else
            {
                user.TotalHoursWorked = user.TotalHoursWorked + hours;
            }
            
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            await _context.SaveChangesAsync();


            return Ok(new
            {
                message = "Check out successful"
            });
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Performance>> GetAll()
        {
            return Ok(await _context.Performances.ToListAsync());
        }
        
    





    }
}