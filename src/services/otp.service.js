const pool = require("../config/db");
const generateOTP = require("../utils/generateOTP");
const sendOTP = require("./email.service");

async function createAndSendOTP(email) {
  const otp = generateOTP();

  // Purana OTP delete karo
  await pool.query(
    "DELETE FROM otp_codes WHERE email = ?",
    [email]
  );

  // Expiry Time (5 Minutes)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Naya OTP Save
  await pool.query(
    `INSERT INTO otp_codes
    (email, otp, expires_at)
    VALUES (?, ?, ?)`,
    [email, otp, expiresAt]
  );

  // Email Send
  await sendOTP(email, otp);

  return true;
}

module.exports = {
  createAndSendOTP,
};