const bcrypt = require("bcrypt");

const hashPassword = async (req, res, next) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(4);
    const saltHash = await bcrypt.hash(password, salt);
    req.passwordHash = saltHash;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = hashPassword;
