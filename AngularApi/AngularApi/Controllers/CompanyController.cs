using AngularApi.Context;
using AngularApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CompanyController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("get-company-id/{email}")]
        public async Task<ActionResult<User>> GetId(string email)
        {
            var co = _context.Companies.FirstOrDefaultAsync(x => x.Email == email);
            if (co == null)
            {
                return BadRequest("You dont have employees" );
            }
            return Ok(new { message = co });


        }
        [HttpPost("createCompany")]
        public async Task<IActionResult> CreateCompany([FromBody] Company companyObj)
        {
            
            if(companyObj == null)
            {
                return BadRequest("Registation failed");
            }
            var email = companyObj.Email;
            await _context.Companies.AddAsync(companyObj);
            await _context.SaveChangesAsync();
            var comp = await _context.Companies.FirstOrDefaultAsync(a=>a.Email==email);
            var id = comp.Id;
            var user = await _context.Users.FirstOrDefaultAsync(a=>a.Email== email);
            user.CompanyId = id;
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Company Registred"
            });
        }

        [HttpPost("check-company/{companyEmail}")]
        public async Task<ActionResult<Company>> CheckCompany(string companyEmail)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(a => a.Email == companyEmail);
            if (company == null)
            {
                
                return BadRequest("Create company first" );
            }
            return Ok( new {message = "You have a company already"});
            

        }
        
    }
}
