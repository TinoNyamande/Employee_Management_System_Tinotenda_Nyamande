using AngularApi.Context;
using AngularApi.Dto;
using AngularApi.Helper;
using AngularApi.Models;
using AngularApi.UtilityService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public UserController(AppDbContext appDbContext,
            IConfiguration configuration,IEmailService emailService)
        {
            _authContext = appDbContext;
            _configuration = configuration;
            _emailService = emailService;

        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)

                return BadRequest();
            var user = await _authContext.Users
                .FirstOrDefaultAsync(x => x.Email == userObj.Email );
            if (user == null)
                return NotFound("User not found" );
            if (!PasswordHasher.VerifyPassword(userObj.Password,user.Password)) {
                return BadRequest("Incorrect password" );
            }

            user.Token = CreateJwt(user);
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            _authContext.Entry(user).State = EntityState.Modified;
            await _authContext.SaveChangesAsync();
            return Ok(new tokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken= newRefreshToken
            }) ; 
        }
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetAllUser(string email)
        {
            var users = _authContext.Users.Where(a => a.CompanyName == email).ToList();
            if (users==null)
            {
                return BadRequest("You dont have any employees" );
            }
            return Ok(new {message=users});

        }
        [HttpGet("user/{email}")]
        public async Task<ActionResult> GetUser(string email)
        {
            var user = _authContext.Users.FirstOrDefault(a=>a.Email == email);
            if (user == null)
            {
                return BadRequest(new { message = "You dont have any employees" });
            }
            return Ok(new { message = user });

        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            //check email
            if (await CheckEmail(userObj.Email))
            {
                return BadRequest("Email already taken" );
            }
            var pass = CheckPassword(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(pass.ToString() );
            }
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = "";
            userObj.CompanyName = userObj.Email;
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User registered"
            });
        }

        [HttpPost("addemployee")]
        public async Task<IActionResult> AddEmployee([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest(new {message = "Invalid form"});
            }
            //check email
         
            if (await CheckEmail(userObj.Email))
            {
                return BadRequest("Email already taken" );
            }
            var pass = CheckPassword(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(pass.ToString() );
            }
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = "";
            var comp = await _authContext.Companies.FirstOrDefaultAsync(a => a.Email == userObj.CompanyName);
            if (comp == null)
            {
                return BadRequest("You need to create company first" );
            }
            userObj.CompanyId = comp.Id;
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User registered"
            });
        }
        private Task<bool> CheckEmail(string email)
            => _authContext.Users.AnyAsync(x => x.Email == email);
        private string CheckPassword(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
            {
                sb.Append("Password should be at least 8 characters long" + Environment.NewLine);

            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
            {
                sb.Append("Password should be alphanumeric" + Environment.NewLine);
            }
            return sb.ToString();



        }
        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim []
            {
                new Claim(ClaimTypes.Role ,user.Role),
                new Claim(ClaimTypes.Name ,user.Name),
                new Claim(ClaimTypes.Email ,user.Email),
                new Claim(ClaimTypes.MobilePhone ,user.Phone)

            });
            var securityKey = new SymmetricSecurityKey(key);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = credentials
            };
           var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
        
        [HttpGet("users/{company}")]
        public async Task<ActionResult<User>> GetAllUsers (int company)
        {
            var users =_authContext.Users.Where(a => a.CompanyId == company).ToList();
            if (users == null)
            {
                return BadRequest("You dont have employees" );
            }
            return Ok(new { message = users });
            

        }
        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail (string email)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(a=>a.Email == email);
            if (user == null)
            {
                return NotFound("Email does not exist"
                ) ;

            }
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ResetPasswordToken = emailToken;
            user.ResetPasswordExpiry = DateTime.Now.AddMinutes(20);
            string from = _configuration["EmailSettings:From"];
            var emailModel = new Email(email, "Password Reset",
                EmailBody.EmailStringBody(email, emailToken));
            _emailService.SendEmail(emailModel);
            _authContext.Entry(user).State = EntityState.Modified;
            await _authContext.SaveChangesAsync();

            return Ok(new
            {
                StatusCode = 200,
                Message = "Email Sent"
            });

        }
        [HttpPost("check-email/{email}")]
        public async Task<ActionResult<Company>> CheckUser(string email)
        {
            var company = await _authContext.Users.FirstOrDefaultAsync(a => a.Email == email);
            if (company == null)
            {

                return BadRequest("User not found" );
            }
            return Ok(new {message = "Check in successful"});


        }
        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _authContext.Users
                .Any(a => a.RefreshToken == refreshToken);

            if (tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token,tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }
            return principal;
        }
        [HttpPost("refresh")] 
        public async Task<IActionResult> Refresh(tokenApiDto tokenApiDto)
        {
            if (tokenApiDto == null)
            {
                return BadRequest();
            }
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name;
            var user = await _authContext.Users.FirstOrDefaultAsync(a=>a.Name == username);
            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Invalid request");
            }
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _authContext.SaveChangesAsync();
            return Ok(new tokenApiDto { AccessToken = accessToken, RefreshToken = newRefreshToken, });


        }

    }
}