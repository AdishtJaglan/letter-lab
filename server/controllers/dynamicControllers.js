import createFields from "../utils/createFields.js";
import Template from "../models/Template.js";

/**
 * @POST add data to dynamically created model of fields.
 * @AUTH -
 * @ENDPOINT /api/template/create/:templateId
 * @REQ_BODY => { req.body } is required, it should be same the fields to the model
 *              you are trying to reach.
 */
export const addDataToDynamicModel = async (req, res) => {
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
};

/**
 * @GET Get all data for a specific template.
 * @AUTH -
 * @ENDPOINT /api/template/data/:templateId
 * @RES_BODY => { message, templateName, fields[], data[] } fields are field of the dynamic model,
 *              data is the data retrieved from that model
 */
export const getDynamicModelData = async (req, res) => {
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
};
