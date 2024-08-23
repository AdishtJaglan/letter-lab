import { Router } from "express";
import createFields from "../utils/createFields.js";
import Template from "../models/Template.js";
import User from "../models/User.js";

const router = Router();

/**
 * @POST create a template.
 * @AUTH -
 * @ENDPOINT /api/template/:userId
 * @REQ_BODY => { name, fields } are required.
 */
router.post("/:userId", async (req, res) => {
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

    createFields(template._id, fields);

    return res
      .status(200)
      .json({ message: "Template created successfully.", data: template });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating template.", error: error.message });
  }
});

/**
 * @POST add data to dynamically created model of fields.
 * @AUTH -
 * @ENDPOINT /api/template/create/:templateId
 * @REQ_BODY => { req.body } is required, it should be same the fields to the model
 *              you are trying to reach.
 */
router.post("/create/:templateId", async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: "Template not found." });
    }

    const DynamicModel = createFields(templateId, template.fields);
    const data = { template: templateId, ...req.body };

    const newEntry = await DynamicModel.create(data);

    res
      .status(201)
      .json({ message: "Added data to the dynamic model.", data: newEntry });
  } catch (error) {
    return res.status(500).json({
      message: "Error entering data into template's dynamically created model.",
      error: error.message,
    });
  }
});

/**
 * @GET Get all data for a specific template.
 * @AUTH -
 * @ENDPOINT /api/template/:templateId/data
 * @RES_BODY => { message, templateName, fields[], data[] } fields are field of the dynamic model,
 *              data is the data retrieved from that model
 */
router.get("/data/:templateId", async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: "Template not found." });
    }

    const DynamicModel = createFields(templateId, template.fields);
    const data = await DynamicModel.find({ template: templateId });

    if (!data) {
      return res.status(404).json({ message: "No data found." });
    }

    return res.status(200).json({
      message: "Data retrieved successfully.",
      templateName: template.templateName,
      fields: template.fields,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving template data.",
      error: error.message,
    });
  }
});

/**
 * @GET Get all templates for a specific user
 * @AUTH -
 * @ENDPOINT /api/template/:userId
 * @RES_BODY => { message, templates[] }
 */
router.get("/:userId", async (req, res) => {
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
});

router.get("/", async (req, res) => {
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
});

/**
 * @PUT Update a specific template
 * @AUTH -
 * @ENDPOINT /api/template/:templateId
 * @REQ_BODY => { name, fields }
 */
router.put("/:templateId", async (req, res) => {
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

    createFields(templateId, fields);

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
});

/**
 * @DELETE Delete a specific template
 * @AUTH -
 * @ENDPOINT /api/template/:templateId
 */
router.delete("/:templateId", async (req, res) => {
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
    const DynamicModel = createFields(templateId, deletedTemplate.fields);
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
});

export default router;
