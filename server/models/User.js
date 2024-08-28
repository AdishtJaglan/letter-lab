import mongoose from "mongoose";
import hashPassword from "../middlewares/hashPassword.js";
const { Schema } = mongoose;

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  gridFsFileId: {
    type: Schema.Types.ObjectId,
    ref: "GridFsFiles",
  },
  fileData: Buffer,
});

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
  files: [FileSchema],
});

UserSchema.pre("save", hashPassword);

const User = mongoose.model("User", UserSchema);
export default User;
