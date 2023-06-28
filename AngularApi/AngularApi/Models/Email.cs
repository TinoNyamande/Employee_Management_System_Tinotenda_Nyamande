namespace AngularApi.Models
{
    public class Email
    {
        public string To { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        public Email(String to ,String subject, String content) {
            To = to;
            Subject = subject;
            Content = content;
        }
    }
}
