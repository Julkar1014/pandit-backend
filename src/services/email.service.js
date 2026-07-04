const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTP(email, otp) {
  const mailOptions = {
    from: `"Pandit Booking" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Login OTP - Pandit Booking",
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Pandit Booking Admin Login</h2>

        <p>Your One Time Password (OTP) is:</p>

        <h1 style="letter-spacing:5px;color:#ff6b00">
          ${otp}
        </h1>

        <p>This OTP will expire in <b>5 minutes</b>.</p>

        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendOTP;