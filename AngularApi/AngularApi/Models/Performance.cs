using System.ComponentModel.DataAnnotations;

namespace AngularApi.Models
{
    public class Performance
    {
       
        [Key]
        public int Id { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; } 

        [DataType(DataType.Time)]
        public DateTime CheckinTime { get; set; } 

        [DataType(DataType.Date)]
        public DateTime? CheckoutTime { get; set; }

        public string? WorkDone { get; set; }

        public string Email { get; set; }
        
        public int ? HoursWorked { get;set; }
        public string? CompanyEmail { get; set; }
    }
}
