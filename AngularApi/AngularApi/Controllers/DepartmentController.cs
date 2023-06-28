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
    
    public class DepartmentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DepartmentController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("createDepartment")]
        public async Task<IActionResult> CreateDepartment([FromBody] Department depObj)
        {
            if (depObj == null)
            {
                return BadRequest();
            }
            await _context.Departments.AddAsync(depObj);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "department created"
            });
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Department>> getAll()
        {
            return Ok(await _context.Departments.ToListAsync());
        }
    }
}
