import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  getUserTemplate,
  updateUser,
} from "../controllers/userControllers.js";

const router = Router();

/**
 * @POST create a user.
 * @AUTH -
 * @ENDPOINT /api/user
 * @REQ_BODY => {username, email, password} are required.
 */
router.post("/", createUser);

/**
 * @GET get all users.
 * @AUTH -
 * @ENDPOINT /api/user
 * @RES_BODY => {message, data[]} data will be an array of users.
 */
router.get("/", getAllUsers);

/**
 * @GET get a user and their template info.
 * @AUTH -
 * @ENDPOINT /api/user/:id/template
 * @RES_BODY => {message, data, templates[]} data will be a user, template will be registered templates.
 */
router.get("/:id/template", getUserTemplate);

/**
 * @GET get one user.
 * @AUTH -
 * @ENDPOINT /api/user/:id
 * @RES_BODY => {message, data} data will be a user.
 */
router.get("/:id", getOneUser);

/**
 * @PUT Update a user data.
 * @AUTH -
 * @ENDPOINT /api/user/:id
 * @REQ_BODY => { req.body } body has to be updated user body.
 */
router.put("/:id", updateUser);

/**
 * @DELETE Delete a user data.
 * @AUTH -
 * @ENDPOINT /api/user/:id
 */
router.delete("/:id", deleteUser);

export default router;
