const { sendEmail } = require("../Configs/nodemailer.config");
const { OTP } = require("../Schema/otp.schema");
const { generateAccessToken } = require("../Utils/jwt.utils");
const crypto = require("crypto");

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  try {
    const otpUser = await OTP.findOneAndUpdate(
      { email },
      {
        otp,
        otpExpiry,
        used: false,
      },
      { upsert: true, new: true }
    );

    const done = await sendEmail(
      process.env.EMAIL_USER,
      email,
      "Your OTP Code",
      `Your OTP is: ${otp}. It expires in 10 minutes.`
    );
    if (!otpUser || !done) throw new Error("Error");

    return res.status(200).send({
      message: "OTP sent successfully",
      error: null,
    });
  } catch (error) {
    return res.status(500).send({
      message: null,
      error: "Error sending OTP",
    });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpUser = await OTP.findOne({ email });

    
    if (!otpUser || otpUser.otp !== otp || otpUser.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: null,
        error: "Invalid or expired OTP!",
        data: null,
      });
    }
    
    if (otpUser.used)
      return res.status(400).send({
        message: null,
        error: "OTP already used!",
        data: null,
      });
      
    otpUser.used = true;
    otpUser.save();

    const accessToken = generateAccessToken(
      { email },
      process.env.TEMPORARY_TOKEN_EXPIRY
    );

    res.status(200).send({
      message: "OTP verified successfully",
      error: null,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: null,
      error: "Error verifying OTP",
      data: null,
    });
  }
};

module.exports = { sendOtp, verifyOTP };