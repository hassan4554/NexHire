const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_PRIVATE_KEY, {
    expiresIn: "30s",
  });
  return token;
};

const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_PRIVATE_KEY, {
    expiresIn: "1m",
  });
  return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
