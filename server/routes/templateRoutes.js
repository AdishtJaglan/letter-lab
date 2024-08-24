import { Router } from "express";
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
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
