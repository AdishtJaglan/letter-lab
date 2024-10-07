import { Request, Response, NextFunction } from "express";
import {
  getDynamicModel,
  convertToPlainFields,
} from "../models/DynamicModel.js";
import Template from "../models/Template.js";

/**
 * @POST add data to dynamically created model of fields.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId
 * @REQ_BODY => { req.body } is required, it should be same the fields to the model
 *              you are trying to reach.
 */
export const addDataToDynamicModel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { templateId } = req.params;
    const template = await Template.findById(templateId);

    if (!template) {
      res.status(404).json({ message: "Template not found." });
      return;
    }

    const fieldsArray = convertToPlainFields(template.fields);
    const DynamicModel = getDynamicModel(templateId, fieldsArray);
    const data = { template: templateId, ...req.body };

    const newEntry = await DynamicModel.create(data);

    res
      .status(201)
      .json({ message: "Added data to the dynamic model.", data: newEntry });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message:
          "Error entering data into template's dynamically created model.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error entering data into template's dynamically created model.",
    });
  }
};

/**
 * @GET Get all data for a specific template.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId
 * @RES_BODY => { message, templateName, fields[], data[] } fields are field of the dynamic model,
 *              data is the data retrieved from that model
 */
export const getDynamicModelData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { templateId } = req.params;
    const template = await Template.findById(templateId);

    if (!template) {
      res.status(404).json({ message: "Template not found." });
      return;
    }

    const fieldsArray = convertToPlainFields(template.fields);
    const DynamicModel = getDynamicModel(templateId, fieldsArray);
    const data = await DynamicModel.find({ template: templateId });

    if (!data) {
      res.status(404).json({ message: "No data found." });
      return;
    }

    res.status(200).json({
      message: "Data retrieved successfully.",
      templateName: template.templateName,
      fields: template.fields,
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error retrieving template data.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error retrieving template data.",
    });
  }
};

/**
 * @GET Read - Get a single data entry for a specific template.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId/:id -> id is dynamic model entry id
 * @RES_BODY => { message, data } data is the single entry retrieved from the model
 */
export const getSingleDataFromDynamicModel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { templateId, id } = req.params;
    const template = await Template.findById(templateId);

    if (!template) {
      res.status(404).json({ message: "Template not found." });
      return;
    }

    const fieldsArray = convertToPlainFields(template.fields);
    const DynamicModel = getDynamicModel(templateId, fieldsArray);
    const data = await DynamicModel.findById(id);

    if (!data) {
      res.status(404).json({ message: "No data added for these fields." });
      return;
    }

    res.status(200).json({ message: "Fetch dynamic model data.", data: data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error fetching data from dynamic model.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error fetching data from dynamic model.",
    });
  }
};

/**
 * @PATCH Update isMailSent status for a single data entry
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId/:id -> is dynamic model entry id
 * @RES_BODY => { message, data } data is the updated entry
 */
export const setMailSent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { templateId, id } = req.params;
    const template = await Template.findById(templateId);

    if (!template) {
      res.status(404).json({ message: "Template not found." });
      return;
    }

    const fieldsArray = convertToPlainFields(template.fields);
    const DynamicModel = getDynamicModel(templateId, fieldsArray);
    const patchedData = await DynamicModel.findByIdAndUpdate(
      id,
      { isMailSent: true },
      { new: true, runValidators: true }
    );

    if (!patchedData) {
      res.status(404).json({ message: "Data entry not found while patching." });
      return;
    }

    res
      .status(200)
      .json({ message: "Set isMailSent as true.", data: patchedData });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Unable to set isMailSent as true.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Unable to set isMailSent as true.",
    });
  }
};

/**
 * @PUT Update - Update a single data entry for a specific template.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId/:id -> is dynamic model entry id
 * @REQ_BODY => { req.body } fields to update
 * @RES_BODY => { message, data } data is the updated entry
 */
export const updateDynamicModel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { templateId, id } = req.params;
    const updateBody = req.body;
    const template = await Template.findById(templateId);

    if (!template) {
      res.status(404).json({ message: "Template not found." });
      return;
    }

    const fieldsArray = convertToPlainFields(template.fields);
    const DynamicModel = getDynamicModel(templateId, fieldsArray);
    const updatedData = await DynamicModel.findByIdAndUpdate(id, updateBody, {
      new: true,
    });

    if (!updatedData) {
      res.status(404).json({ message: "Entry not found in dynamic model." });
      return;
    }

    res
      .status(200)
      .json({ message: "Successfully updated entry.", data: updatedData });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Unable to update dynamic model entry.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Unable to update dynamic model entry.",
    });
  }
};

/**
 * @DELETE Delete - Delete a single data entry for a specific template.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId/:id -> id is dynamic model entry id
 * @RES_BODY => { message } confirmation of deletion
 */
export const deleteDynamicModelData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { templateId, id } = req.params;
    const template = await Template.findById(templateId);

    if (!template) {
      res.status(404).json({ message: "Template not found." });
      return;
    }

    const fieldsArray = convertToPlainFields(template.fields);
    const DynamicModel = getDynamicModel(templateId, fieldsArray);
    const deletedData = await DynamicModel.findByIdAndDelete(id);

    if (!deletedData) {
      res.status(404).json({ message: "Dynamic model entry not found." });
      return;
    }

    res
      .status(200)
      .json({ message: "Data successfully deleted.", data: deletedData });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error deleting dynamic model data.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error deleting dynamic model data.",
    });
  }
};
