const transporter = require('./EmailTransporter');

const otpEmailTemplate = (otp, name = "User") => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verification Code</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f6f8;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="
      background-color: #111827;
      padding: 28px 20px;
      text-align: center;
    ">
      <h1 style="
        margin: 0;
        color: #ffffff;
        font-size: 24px;
      ">
        Concise Blogs System
      </h1>
    </div>

    <!-- Content -->
    <div style="padding: 35px 30px;">

      <h2 style="
        margin-top: 0;
        color: #111827;
        font-size: 22px;
      ">
        Hello ${name},
      </h2>

      <p style="
        color: #4b5563;
        font-size: 15px;
        line-height: 1.6;
      ">
        Use the verification code below to continue with your account.
      </p>

      <div style="
        margin: 30px 0;
        text-align: center;
      ">
        <div style="
          display: inline-block;
          background-color: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 18px 35px;
        ">
          <span style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #111827;
          ">
            ${otp}
          </span>
        </div>
      </div>

      <p style="
        color: #6b7280;
        font-size: 14px;
        line-height: 1.6;
        text-align: center;
      ">
        This verification code will expire in <strong>2 minutes</strong>.
      </p>

      <p style="
        color: #6b7280;
        font-size: 14px;
        line-height: 1.6;
      ">
        If you did not request this code, you can safely ignore this email.
      </p>

    </div>

    <!-- Footer -->
    <div style="
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    ">
      <p style="
        margin: 0;
        color: #9ca3af;
        font-size: 12px;
      ">
        © 2026 Concise Blog . All rights reserved.
      </p>
    </div>

  </div>

</body>
</html>
`;
};

const sendOtp = async({email,otp,name})=>{
    try {
        await transporter.transactionalEmails.sendTransacEmail({
            sender : {
                email : "dummycubarsi@gmail.com",
                name : "compact-blog"
            },
            to : [
                {
                    email,
                }
            ],
            subject : "OTP VERIFICATION",
            htmlContent : otpEmailTemplate(otp,name),
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendOtp;