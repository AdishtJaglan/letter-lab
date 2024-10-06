import bcrypt from "bcrypt";

/**
 * @WARNING -> do not convert to arrow function!
 */
const hashPassword = async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
};

export default hashPassword;
