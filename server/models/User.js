import mongoose from "mongoose";
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
  templates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Template",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
