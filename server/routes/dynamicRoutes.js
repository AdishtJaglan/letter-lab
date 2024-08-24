import { Router } from "express";
import {
  addDataToDynamicModel,
  deleteDynamicModelData,
  getDynamicModelData,
  getSingleDataFromDynamicModel,
  setMailSent,
  updateDynamicModel,
} from "../controllers/dynamicControllers.js";

const router = Router();

/**
 * @POST add data to dynamically created model of fields.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId
 * @REQ_BODY => { req.body } is required, it should be same the fields to the model
 *              you are trying to reach.
 */
router.post("/:templateId", addDataToDynamicModel);

/**
 * @GET Get all data for a specific template.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId
 * @RES_BODY => { message, templateName, fields[], data[] } fields are field of the dynamic model,
 *              data is the data retrieved from that model
 */
router.get("/:templateId", getDynamicModelData);

/**
 * @GET Read - Get a single data entry for a specific template.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId/:id -> id is dynamic model entry id
 * @RES_BODY => { message, data } data is the single entry retrieved from the model
 */
router.get("/:templateId/:id", getSingleDataFromDynamicModel);

/**
 * @PUT Update - Update a single data entry for a specific template.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId/:id -> id is dynamic model entry id
 * @REQ_BODY => { req.body } fields to update
 * @RES_BODY => { message, data } data is the updated entry
 */
router.put("/:templateId/:id", updateDynamicModel);

/**
 * @PATCH Update isMailSent status for a single data entry
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId/:id -> is dynamic model entry id
 * @RES_BODY => { message, data } data is the updated entry
 */
router.patch("/:templateId/:id", setMailSent);

/**
 * @DELETE Delete - Delete a single data entry for a specific template.
 * @AUTH -
 * @ENDPOINT /api/dynamic/:templateId/:id -> id is dynamic model entry id
 * @RES_BODY => { message } confirmation of deletion
 */
router.delete("/:templateId/:id", deleteDynamicModelData);

export default router;
