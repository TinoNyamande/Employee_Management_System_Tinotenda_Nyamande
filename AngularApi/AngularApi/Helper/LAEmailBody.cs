namespace AngularApi.Helper
{
    public class LAEmailBody
    {
        public static string EmailStringBody(string email, string emailToken)
        {
            return $@"<html>
                <head></head>
<body style=""margin:0;padding:0;font-family:Arial,Helvetica;"">
<div style=""height:auto;background:linear-gradient(to top , #c9c9ff 50%,#6e6ef6 90%) no repeat
;width:400px;padding:30px"">

<div>
<h1>Leave application EMS</h1>
<hr>
<p>An employee has made a leave application Click the link below to see the details </p>
<a href=""http://localhost:4200/reset?email={email}&code={emailToken}"" target=""_blank""
style=""background:#0d6efc;padding:10px;border:none;color:white;border-radius:4px;display:block;margin:0 auto
width:50%;text-align:center;text-decoration:none""> View leave application </a> <br>

<p>Kind Regards</p><br><br>
<p>EMS<p>
</div>
</div>
</div>
</body>
</html>
";
        }
    }
}
