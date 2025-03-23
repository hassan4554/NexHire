const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
