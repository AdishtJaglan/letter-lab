import getDyanmicModel from "../models/DynamicModel.js";
import User from "../models/User.js";
import Template from "../models/Template.js";

/**
 * @POST create a template.
 * @AUTH -
 * @ENDPOINT /api/template/:userId
 * @REQ_BODY => { name, fields } are required.
 */
export const createTemplate = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, fields } = req.body;

    if (!userId || !name || !fields) {
      return res.status(400).json({ message: "All fields mandatory." });
    }

    const template = await Template.create({
      templateName: name,
      owner: userId,
      fields,
    });
    await User.findByIdAndUpdate(userId, {
      $push: { templates: template._id },
    });

    getDyanmicModel(template._id, fields);

    return res
      .status(200)
      .json({ message: "Template created successfully.", data: template });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating template.", error: error.message });
  }
};

/**
 * @GET Get all templates for a specific user
 * @AUTH -
 * @ENDPOINT /api/template/:userId
 * @RES_BODY => { message, templates[] }
 */
export const getUserTemplate = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("templates");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Templates retrieved successfully.",
      templates: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving template.",
      error: error.message,
    });
  }
};

/**
 * @GET Get all templates.
 * @AUTH -
 * @ENDPOINT /api/template
 * @RES_BODY => { message, data[] }
 */
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find({});

    if (!templates) {
      return res.status(404).json({ message: "No templates found." });
    }

    return res
      .status(200)
      .json({ message: "Fetched templates.", data: templates });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching templates.", error: error.message });
  }
};

/**
 * @PUT Update a specific template
 * @AUTH -
 * @ENDPOINT /api/template/:templateId
 * @REQ_BODY => { name, fields }
 */
export const updateTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { name, fields } = req.body;

    if (!name || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({
        message:
          "Name and fields are required. Fields must be a non-empty array.",
      });
    }

    const updatedTemplate = await Template.findByIdAndUpdate(
      templateId,
      { templateName: name, fields: fields },
      { new: true, runValidators: true }
    );

    if (!updatedTemplate) {
      return res.status(404).json({ message: "Template not found." });
    }

    getDyanmicModel(templateId, fields);

    return res.status(200).json({
      message: "Template updated successfully.",
      template: updatedTemplate,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating template.",
      error: error.message,
    });
  }
};

/**
 * @DELETE Delete a specific template
 * @AUTH -
 * @ENDPOINT /api/template/:templateId
 */
export const deleteTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;

    const deletedTemplate = await Template.findByIdAndDelete(templateId);
    if (!deletedTemplate) {
      return res.status(404).json({ message: "Template not found." });
    }

    // Remove template reference from user
    await User.findByIdAndUpdate(deletedTemplate.owner, {
      $pull: { templates: templateId },
    });

    // Delete the dynamic model and its data
    const DynamicModel = getDyanmicModel(templateId, deletedTemplate.fields);
    await DynamicModel.deleteMany({ template: templateId });

    return res.status(200).json({
      message: "Template and associated data deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting template.",
      error: error.message,
    });
  }
};
