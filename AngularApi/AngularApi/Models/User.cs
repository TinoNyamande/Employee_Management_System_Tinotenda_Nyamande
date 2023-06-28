using System.ComponentModel.DataAnnotations;

namespace AngularApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; } 
        
        public string? Name { get; set; }    

        public string? Surname { get; set; }

        public int CompanyId { get; set; }  

        public string? Email { get; set;}

        public string? Phone { get; set;}

        public string? Role { get; set;}

        public string? CompanyName { get; set; }

        [DataType(DataType.Password)]
        public string? Password { get; set; }

        public string? Token { get; set; }
        public string? ResetPasswordToken { get; set; }
        public DateTime ResetPasswordExpiry { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        public int? TotalHoursWorked { get; set; }
        public int?  TotalNumberOfLeaveDays { get; set; }






    }
}
