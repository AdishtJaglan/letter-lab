import User from "../models/User.js";

/**
 * @POST Upload a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/
 * @REQ_BODY => { file } -> the file you are upload. @MAX_SIZE - 16MB
 * @RES_BODY => { message, file } -> saved file
 */
export const uploadFile = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { file } = req;
    user.files.push({
      name: file.fieldname,
      size: file.size,
      contentType: file.mimetype,
      fileData: file.buffer,
    });

    await user.save();

    return res
      .status(201)
      .json({ message: "Saved file successfully.", file: user.files });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to upload file.", error: error.message });
  }
};

/**
 * @GET Get all files.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/
 * @RES_BODY => { message, files[] } -> array of files
 */
export const getAllFiles = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const user = await User.findById(id).select("files");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "Fetched user's file data.", files: user.files });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching files.", error: error.message });
  }
};

/**
 * @GET Get a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/:fileId -> id of the file
 * @RES_BODY => { message, data } -> data has file
 */
export const getOneFile = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const { fileId } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const file = user.files.id(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }

    return res
      .status(200)
      .json({ message: "File fetched successfully.", data: file });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching file.", error: error.message });
  }
};

/**
 * @GET Download a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/download/:fileId -> id of the file
 * @REQ_BODY { type } -> send type of file you want, ex: pdf, docx etc
 * @RES_BODY => gives option/downloads file to your device
 */
export const downloadOneFile = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const { fileId } = req.params;
    const { type } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const file = user.files.id(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }

    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.name}.${type}"`,
      "Content-Length": file.size,
    });

    res.send(file.fileData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to download file.", error: error.message });
  }
};

/**
 * @PATCH Update the name of a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/:fileId -> id of the file
 * @REQ_BODY => { name } -> updated name.
 * @RES_BODY => { message, file } -> update file
 */
export const updateFile = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const { fileId } = req.params;
    const { name } = req.body;
    console.log(name);
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const file = user.files.id(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }

    file.name = name;
    console.log(file.name);
    await user.save();

    return res
      .status(200)
      .json({ message: "File updated successfully.", file: user.files });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating the file.", error: error.message });
  }
};

/**
 * @DELETE Delete a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/:fileId -> id of the file
 * @RES_BODY => { message, file } -> deleted file for verification
 */
export const deleteFile = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const { fileId } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.files.id(fileId).deleteOne();
    await user.save();

    return res
      .status(200)
      .json({ message: "File deleted successfully.", files: user.files });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting the file.", error: error.message });
  }
};
