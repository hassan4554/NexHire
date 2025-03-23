const bcrypt = require("bcrypt");

const comparePassword = async (simplePassword, hashPassword) => {
  const validPass = await bcrypt.compare(simplePassword, hashPassword);
  if (validPass) return true;
  return false;
};

module.exports = { comparePassword };
