const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (from, to, subject, text) => {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { sendEmail };
