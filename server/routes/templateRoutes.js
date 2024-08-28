import { Router } from "express";
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getUserTemplate,
  updateTemplate,
} from "../controllers/templateControllers.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();

router.use(verifyJwt);
router.use("/:userId", validateObjectId);
router.use("/:templateId", validateObjectId);

/**
 * @POST create a template.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template/:userId
 * @REQ_BODY => { name, fields } are required.
 */
router.post("/:userId", createTemplate);

/**
 * @GET Get all templates for a specific user
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template/:userId
 * @RES_BODY => { message, templates[] }
 */
router.get("/:userId", getUserTemplate);

/**
 * @GET Get all templates.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template
 * @RES_BODY => { message, data[] }
 */
router.get("/", getAllTemplates);

/**
 * @PUT Update a specific template
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template/:templateId
 * @REQ_BODY => { name, fields }
 */
router.put("/:templateId", updateTemplate);

/**
 * @DELETE Delete a specific template
 * @AUTH - REQUIRED
 * @ENDPOINT /api/template/:templateId
 */
router.delete("/:templateId", deleteTemplate);

export default router;
