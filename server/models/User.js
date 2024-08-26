import mongoose from "mongoose";
import hashPassword from "../middlewares/hashPassword.js";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    url: String,
    name: String,
  },
  templates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Template",
    },
  ],
});

UserSchema.pre("save", hashPassword);

const User = mongoose.model("User", UserSchema);
export default User;
