import mongoose, { Types, Schema } from "mongoose";

interface Fields {
  type: string;
  name: string;
}

/**
 * Generates a dynamic Mongoose model based on the provided fields.
 * @param {mongoose.Types.ObjectId | string} templateId - The template ID used for model naming.
 * @param {Fields[]} fields - An array of field definitions for the schema.
 * @returns {mongoose.Model} - The dynamically created Mongoose model.
 */
export const getDynamicModel = (
  templateId: mongoose.Types.ObjectId | string,
  fields: Fields[]
) => {
  const dynamicSchema = new Schema(
    {
      template: {
        type: Schema.Types.ObjectId,
        ref: "Template",
        required: true,
      },
      isMailSent: {
        type: Boolean,
        default: false,
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

  return mongoose.models[modelName] || mongoose.model(modelName, dynamicSchema);
};

/**
 * Converts a Mongoose DocumentArray to a plain array of Fields.
 * @param {Types.DocumentArray} documentArray - The Mongoose DocumentArray to convert.
 * @returns {Fields[]} - A plain array of field objects.
 */
export const convertToPlainFields = (
  documentArray: Types.DocumentArray<{
    type?: string | null;
    name?: string | null;
  }>
): Fields[] => {
  return documentArray
    .map((doc) => ({
      type: doc.type || "",
      name: doc.name || "",
    }))
    .filter((field) => field.type && field.name); // Filter out fields missing type or name
};
