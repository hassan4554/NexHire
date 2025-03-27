const { User } = require("../Schema/user.schema");
const { comparePassword } = require("../Utils/bcrypt.utils");
const path = require("path");
const fs = require("fs").promises;

const createUser = async (userData) => {
  try {
    const { username, password, email, name, contact } = userData;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return null;
    }
    const newUser = new User({ username, password, email, name, contact });
    await newUser.save();
    return newUser;
  } catch (error) {
    return null;
  }
};

const passwordUpdate = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user)
    return {
      status: 404,
      message: null,
      error: "No user found!",
    };

  const same = await comparePassword(oldPassword, user.password);
  if (!same)
    return {
      status: 400,
      message: null,
      error: "Incorrect Password!",
    };

  user.password = newPassword;
  user.save();

  return {
    status: 200,
    message: "Password changed successfully!",
    error: null,
  };
};

const deleteProfilePhoto = async (user) => {
  const uploadDir = path.join(__dirname, "..", "uploads");
  const fileName = `${user.username}.jpg`;
  const filePath = path.join(uploadDir, fileName);

  if (user.profilePicture) {
    try {
      await fs.unlink(filePath);
      console.log(`Deleted profile picture of ${user.username}`);
    } catch (fileError) {
      console.log(
        `Failed to delete profile picture of ${user.username}: ${fileError.message}`
      );
    }
  }
};

module.exports = { createUser, passwordUpdate, deleteProfilePhoto };
