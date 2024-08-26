import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";

/**
 * @POST create a user.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/user
 * @REQ_BODY => { username, email, password } are required.
 */
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { filename, path } = req.file;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All field mandatory." });
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const user = await User.create({
      username,
      email,
      password,
      profilePicture: {
        url: path,
        name: filename,
      },
    });

    return res
      .status(201)
      .json({ message: "User created successfully.", data: user });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while trying to create the user.",
      error: error.message,
    });
  }
};

/**
 * @GET get all users.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user
 * @RES_BODY => { message, data[] } data will be an array of users.
 */
export const getAllUsers = async (req, res) => {
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
};

/**
 * @GET get a user and their template info.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/template
 * @RES_BODY => { message, data, templates[] } data will be a user, template will be registered templates.
 */
export const getUserTemplate = async (req, res) => {
  try {
    const { userId: id } = req.user;

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
};

/**
 * @GET get one user.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/info
 * @RES_BODY => { message, data } data will be a user.
 */
export const getOneUser = async (req, res) => {
  try {
    const { userId: id } = req.user;

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
};

/**
 * @PATCH Update profile picture.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/
 * @REQ_BODY => { profile } -> updated profile picture
 * @RES_BODY => { message, user } -> updated user
 */
export const updateProfilePicture = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const checkUser = await User.findById(id);

    if (!checkUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (checkUser.profilePicture && checkUser.profilePicture.name) {
      await cloudinary.uploader.destroy(checkUser.profilePicture.name);
    }

    const { path, filename } = req.file;
    const user = await User.findByIdAndUpdate(
      id,
      {
        profilePicture: {
          url: path,
          name: filename,
        },
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unable to update user information." });
    }

    return res
      .status(200)
      .json({ message: "Updated user successfully.", user: user });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating profile picture.",
      error: error.message,
    });
  }
};

/**
 * @PUT Update a user data.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/
 * @REQ_BODY => { req.body } body has to be updated user body.
 */
export const updateUser = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const updateBody = { ...req.body };

    if (updateBody.profilePicture) {
      delete updateBody.profilePicture;
    }

    const checkUser = await User.findById(id);

    if (!checkUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateBody, {
      new: true,
    });

    return res.status(200).json({
      message: "Updated user successfully.",
      updatedData: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "User information unable to be updated",
      error: error.message,
    });
  }
};

/**
 * @DELETE Delete a user data.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/user/
 */
export const deleteUser = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const checkUser = await User.findById(id);

    if (!checkUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (checkUser.profilePicture && checkUser.profilePicture.name) {
      await cloudinary.uploader.destroy(checkUser.profilePicture.name);
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully.",
      deletedData: deletedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to delete user.", error: error.message });
  }
};
