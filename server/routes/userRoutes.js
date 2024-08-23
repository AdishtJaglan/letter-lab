import { Router } from "express";
import User from "../models/User.js";

const router = Router();

/**
 * @POST create a user.
 * @AUTH -
 * @ENDPOINT /api/user
 * @REQ_BODY => {username, email, password} are required.
 */
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All field mandatory." });
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const user = await User.create({ username, email, password });

    return res
      .status(201)
      .json({ message: "User created successfully.", data: user });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while trying to create the user.",
      error: error.message,
    });
  }
});

/**
 * @GET get all users.
 * @AUTH -
 * @ENDPOINT /api/user
 * @RES_BODY => {message, data[]} data will be an array of users.
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(204).json({ message: "No data found." });
    }

    return res.status(200).json({ message: "Fetched users.", data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch users.", error: error.message });
  }
});

/**
 * @GET get a user and their template info.
 * @AUTH -
 * @ENDPOINT /api/user/:id/template
 * @RES_BODY => {message, data, templates[]} data will be a user, template will be registered templates.
 */
router.get("/:id/template", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("templates");

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    return res.status(200).json({
      message: "Fetched user and user's template data.",
      name: user.username,
      email: user.email,
      id: user._id,
      template: user.templates,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch user and user's template information.",
      error: error.message,
    });
  }
});

/**
 * @GET get one user.
 * @AUTH -
 * @ENDPOINT /api/user/:id
 * @RES_BODY => {message, data} data will be a user.
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "Fetched user data.", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch user.", error: error.message });
  }
});

export default router;
