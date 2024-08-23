import mongoose from "mongoose";
import Template from "../models/Template";

const { Schema } = mongoose;

const createFields = (userId, modelName, fields) => {
  const schemaFields = {};

  // Assuming `fields` is an array of objects with 'name' and 'type' properties
  fields.forEach((field) => {
    schemaFields[field.name] = { type: field.type };
  });

  const dynamicSchema = new Schema(schemaFields);

  // Model name should be unique for each user
  const dynamicModel = mongoose.model(`${modelName}_${userId}`, dynamicSchema);

  // Save the metadata to FormModel
  const formModel = new Template({
    userId,
    modelName,
    fields: schemaFields,
  });

  formModel.save();

  return dynamicModel;
};

export default createFields;
