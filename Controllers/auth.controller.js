const { createUser } = require("../Service/user.service");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Utils/jwt.utils");

const signup = async (req, res) => {
  req.body.email = req.user.email;
  const user = await createUser(req.body);

  try {
    if (!user) {
      return res.status(400).send({
        message: null,
        error: "User already present",
        data: null,
      });
    }

    const accessToken = generateAccessToken(
      { _id: user._id },
      process.env.ACCESS_TOKEN_EXPIRY
    );
    const refreshToken = generateRefreshToken(
      { _id: user._id },
      process.env.REFRESH_TOKEN_EXPIRY
    );

    return res.status(200).send({
      message: "User created successfully",
      error: null,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: null,
      error: "Internal Server Error",
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const accessToken = generateAccessToken(
      { _id: req.user._id },
      process.env.ACCESS_TOKEN_EXPIRY
    );
    const refreshToken = generateRefreshToken(
      { _id: req.user._id },
      process.env.REFRESH_TOKEN_EXPIRY
    );

    return res.status(200).send({
      message: "Successful Login",
      error: null,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: null,
      error: "Server Error",
      data: null,
    });
  }
};

const me = (req, res) => {
  try {
    return res.status(200).send({
      message: "ok",
      error: null,
      data: req.user,
    });
  } catch (error) {
    return res.status(500).send({
      message: null,
      error: "Server Error",
      data: null,
    });
  }
};

const refreshToken = (req, res) => {
  try {
    const accessToken = generateAccessToken(
      { _id: req.user._id },
      process.env.ACCESS_TOKEN_EXPIRY
    );
    const refreshToken = generateRefreshToken(
      { _id: req.user._id },
      process.env.REFRESH_TOKEN_EXPIRY
    );

    return res.status(200).send({
      message: "Token Generated Successfully",
      error: null,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: null,
      error: "Server Error",
      data: null,
    });
  }
};

module.exports = { signup, login, me, refreshToken };