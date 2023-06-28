using System.ComponentModel.DataAnnotations;

namespace AngularApi.Models
{
    public class Leave
    {
        [Key]
        public int Id { get; set; }
        public string? LeaveType { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ApplicationDate { get; set; } 

        [DataType(DataType.Date)]
        public DateTime? StartDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? EndDate { get; set; }

        public string Description { get; set; }  
        
        public string Email { get; set; }

        public string? Status { get; set; } 
        public int? CompanyId { get; set; }
        public string ? CompanyName { get; set; }

        public int ? LeaveDaysTaken { get; set; }
        
    }
}

