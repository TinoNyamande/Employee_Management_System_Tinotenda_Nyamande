using AngularApi.Models;

namespace AngularApi.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(Email emailmodel);
    }
}
