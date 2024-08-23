import mongoose from "mongoose";
const { Schema } = mongoose;

const createFields = (templateId, fields) => {
  const dynamicSchema = new Schema(
    {
      template: {
        type: Schema.Types.ObjectId,
        ref: "Template",
        required: true,
      },
    },
    { strict: false }
  );

  fields.forEach((field) => {
    let fieldType;
    switch (field.type.toLowerCase()) {
      case "string":
        fieldType = String;
        break;
      case "number":
        fieldType = Number;
        break;
      case "date":
        fieldType = Date;
        break;
      case "boolean":
        fieldType = Boolean;
        break;
      default:
        fieldType = Schema.Types.Mixed;
    }

    dynamicSchema.add({
      [field.name]: fieldType,
    });
  });

  const modelName = `Template${templateId}Data`;

  if (mongoose.models[modelName]) {
    return mongoose.model(modelName);
  }

  return mongoose.model(modelName, dynamicSchema);
};

export default createFields;
