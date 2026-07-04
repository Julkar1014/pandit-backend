const pool = require("../config/db");
const { createAndSendOTP } = require("../services/otp.service");
const generateToken = require("../utils/jwt");

// ======================
// Send OTP
// ======================
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const [admins] = await pool.query(
      "SELECT * FROM admins WHERE email = ? AND is_active = TRUE",
      [email]
    );

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await createAndSendOTP(email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================
// Verify OTP
// ======================
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const [rows] = await pool.query(
      `SELECT * FROM otp_codes
       WHERE email = ?
       AND otp = ?
       AND verified = FALSE
       ORDER BY id DESC
       LIMIT 1`,
      [email, otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const otpData = rows[0];

    if (new Date() > new Date(otpData.expires_at)) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    await pool.query(
      "UPDATE otp_codes SET verified = TRUE WHERE id = ?",
      [otpData.id]
    );

    const [admins] = await pool.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    const admin = admins[0];

    const token = generateToken(admin);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
};