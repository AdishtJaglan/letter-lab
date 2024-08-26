import { Router } from "express";
import multer from "multer";
import { storage } from "../cloudinary/index.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  getUserTemplate,
  updateProfilePicture,
  updateUser,
} from "../controllers/userControllers.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();
const upload = multer({ storage });

/**
 * @POST create a user.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/user
 * @REQ_BODY => { username, email, password } are required.
 */
router.post("/", upload.single("profile"), createUser);

/**
 * @GET get all users.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user
 * @RES_BODY => { message, data[] } data will be an array of users.
 */
router.get("/", verifyJwt, getAllUsers);

/**
 * @GET get a user and their template info.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/template
 * @RES_BODY => { message, data, templates[] } data will be a user, template will be registered templates.
 */
router.get("/template", verifyJwt, getUserTemplate);

/**
 * @GET get one user.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/info
 * @RES_BODY => { message, data } data will be a user.
 */
router.get("/info", verifyJwt, getOneUser);

/**
 * @PATCH Update profile picture.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/
 * @REQ_BODY => { profile } -> updated profile picture
 * @RES_BODY => { message, user } -> updated user
 */
router.patch("/", upload.single("profile"), verifyJwt, updateProfilePicture);

/**
 * @PUT Update a user data.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/
 * @REQ_BODY => { req.body } body has to be updated user body.
 */
router.put("/", verifyJwt, updateUser);

/**
 * @DELETE Delete a user data.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/
 */
router.delete("/", verifyJwt, deleteUser);

export default router;
