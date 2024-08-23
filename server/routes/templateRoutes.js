import { Router } from "express";;
import {
  addDataToDynamicModel,
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getDynamicModelData,
  getUserTemplate,
  updateTemplate,
} from "../controllers/templateControllers.js";

const router = Router();

/**
 * @POST create a template.
 * @AUTH -
 * @ENDPOINT /api/template/:userId
 * @REQ_BODY => { name, fields } are required.
 */
router.post("/:userId", createTemplate);

/**
 * @POST add data to dynamically created model of fields.
 * @AUTH -
 * @ENDPOINT /api/template/create/:templateId
 * @REQ_BODY => { req.body } is required, it should be same the fields to the model
 *              you are trying to reach.
 */
router.post("/create/:templateId", addDataToDynamicModel);

/**
 * @GET Get all data for a specific template.
 * @AUTH -
 * @ENDPOINT /api/template/data/:templateId
 * @RES_BODY => { message, templateName, fields[], data[] } fields are field of the dynamic model,
 *              data is the data retrieved from that model
 */
router.get("/data/:templateId", getDynamicModelData);

/**
 * @GET Get all templates for a specific user
 * @AUTH -
 * @ENDPOINT /api/template/:userId
 * @RES_BODY => { message, templates[] }
 */
router.get("/:userId", getUserTemplate);

/**
 * @GET Get all templates.
 * @AUTH -
 * @ENDPOINT /api/template
 * @RES_BODY => { message, data[] }
 */
router.get("/", getAllTemplates);

/**
 * @PUT Update a specific template
 * @AUTH -
 * @ENDPOINT /api/template/:templateId
 * @REQ_BODY => { name, fields }
 */
router.put("/:templateId", updateTemplate);

/**
 * @DELETE Delete a specific template
 * @AUTH -
 * @ENDPOINT /api/template/:templateId
 */
router.delete("/:templateId", deleteTemplate);

export default router;
