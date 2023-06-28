using System.ComponentModel.DataAnnotations;

namespace AngularApi.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; } 
        public string? DepartmentName { get; set; }
        public string Email { get;set; }

    }
}
