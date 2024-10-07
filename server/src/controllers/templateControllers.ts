import { Request, Response, NextFunction } from "express";
import {
  getDynamicModel,
  convertToPlainFields,
} from "../models/DynamicModel.js";
import User from "../models/User.js";
import Template from "../models/Template.js";

/**
 * @POST create a template.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template/:userId
 * @REQ_BODY => { name, fields } are required.
 */
export const createTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { name, fields } = req.body;

    if (!userId || !name || !fields) {
      res.status(400).json({ message: "All fields mandatory." });
      return;
    }

    const template = await Template.create({
      templateName: name,
      owner: userId,
      fields,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { templates: template._id },
    });

    getDynamicModel(template._id, fields);

    res
      .status(200)
      .json({ message: "Template created successfully.", data: template });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating template.", error: error.message });
      return;
    }
    res.status(500).json({ message: "Error creating template." });
  }
};

/**
 * @GET Get all templates for a specific user
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template/:userId
 * @RES_BODY => { message, templates[] }
 */
export const getUserTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("templates");

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json({
      message: "Templates retrieved successfully.",
      templates: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error retrieving template.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error retrieving template.",
    });
  }
};

/**
 * @GET Get all templates.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template
 * @RES_BODY => { message, data[] }
 */
export const getAllTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const templates = await Template.find({});

    if (!templates) {
      res.status(404).json({ message: "No templates found." });
      return;
    }

    res.status(200).json({ message: "Fetched templates.", data: templates });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error fetching templates.", error: error.message });
      return;
    }

    res.status(500).json({ message: "Error fetching templates." });
  }
};

/**
 * @PUT Update a specific template
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template/:templateId
 * @REQ_BODY => { name, fields }
 */
export const updateTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { templateId } = req.params;
    const { name, fields } = req.body;

    if (!name || !Array.isArray(fields) || fields.length === 0) {
      res.status(400).json({
        message:
          "Name and fields are required. Fields must be a non-empty array.",
      });
      return;
    }

    const updatedTemplate = await Template.findByIdAndUpdate(
      templateId,
      { templateName: name, fields: fields },
      { new: true, runValidators: true }
    );

    if (!updatedTemplate) {
      res.status(404).json({ message: "Template not found." });
      return;
    }

    getDynamicModel(templateId, fields);

    res.status(200).json({
      message: "Template updated successfully.",
      template: updatedTemplate,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error updating template.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error updating template.",
    });
  }
};

/**
 * @DELETE Delete a specific template
 *  REQUIRED@AUTH -
 * @ENDPOINT /api/template/:templateId
 */
export const deleteTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { templateId } = req.params;

    // Find and delete the template by ID
    const deletedTemplate = await Template.findByIdAndDelete(templateId);
    if (!deletedTemplate) {
      res.status(404).json({ message: "Template not found." });
      return;
    }

    // Remove the template reference from the associated user
    await User.findByIdAndUpdate(deletedTemplate.owner, {
      $pull: { templates: templateId },
    });

    // Convert the template fields to a plain array and use it to delete the dynamic model data
    const fieldsArray = convertToPlainFields(deletedTemplate.fields);
    const DynamicModel = getDynamicModel(templateId, fieldsArray);
    await DynamicModel.deleteMany({ template: templateId });

    res.status(200).json({
      message: "Template and associated data deleted successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error deleting template.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error deleting template.",
    });
  }
};
