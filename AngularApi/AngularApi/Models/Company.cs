using System.ComponentModel.DataAnnotations;

namespace AngularApi.Models
{

    public class Company
    {
        [Key]
        public int Id { get; set; }
        public string? CompanyName { get; set; }

        [DataType(DataType.Date)]
        public DateTime Created { get; set; }
        public string Email { get; set; }
        
    }
}
