import mongoose from "mongoose";
const { Schema } = mongoose;

const TemplateSchema = new Schema({
  templateName: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fields: [
    {
      name: { type: String },
      type: { type: String },
    },
  ],
});

const Template = mongoose.model("Template", TemplateSchema);
export default Template;
