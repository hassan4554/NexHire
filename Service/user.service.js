const { User } = require("../Schema/user.schema");

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

module.exports = { createUser };
