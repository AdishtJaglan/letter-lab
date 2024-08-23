import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const TemplateSchema = new Schema({
  templateName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fields: {
    type: Object,
  },
});

const Template = mongoose.model("Template", TemplateSchema);
export default Template;
