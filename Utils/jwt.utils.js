const jwt = require("jsonwebtoken");

const generateAccessToken = (payload, expiry) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_PRIVATE_KEY, {
    expiresIn: expiry,
  });
  return token;
};

const generateRefreshToken = (payload, expiry) => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_PRIVATE_KEY, {
    expiresIn: expiry,
  });
  return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
