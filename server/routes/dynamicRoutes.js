import { Router } from "express";
import {
  addDataToDynamicModel,
  getDynamicModelData,
} from "../controllers/dynamicControllers.js";

const router = Router();

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

export default router;
