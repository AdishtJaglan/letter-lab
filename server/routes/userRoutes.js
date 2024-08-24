import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  getUserTemplate,
  updateUser,
} from "../controllers/userControllers.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();

router.use("/:id", validateObjectId);

/**
 * @POST create a user.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/user
 * @REQ_BODY => {username, email, password} are required.
 */
router.post("/", createUser);

/**
 * @GET get all users.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user
 * @RES_BODY => {message, data[]} data will be an array of users.
 */
router.get("/", verifyJwt, getAllUsers);

/**
 * @GET get a user and their template info.
 * @AUTH -REQUIRED
 * @ENDPOINT /api/user/:id/template
 * @RES_BODY => {message, data, templates[]} data will be a user, template will be registered templates.
 */
router.get("/:id/template", verifyJwt, getUserTemplate);

/**
 * @GET get one user.
 * @AUTH -REQUIRED
 * @ENDPOINT /api/user/:id
 * @RES_BODY => {message, data} data will be a user.
 */
router.get("/:id", verifyJwt, getOneUser);

/**
 * @PUT Update a user data.
 * @AUTH -REQUIRED
 * @ENDPOINT /api/user/:id
 * @REQ_BODY => { req.body } body has to be updated user body.
 */
router.put("/:id", verifyJwt, updateUser);

/**
 * @DELETE Delete a user data.
 * @AUTH -REQUIRED
 * @ENDPOINT /api/user/:id
 */
router.delete("/:id", verifyJwt, deleteUser);

export default router;
