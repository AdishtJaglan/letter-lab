import { Router } from "express";
import multer from "multer";
import verifyJwt from "../middlewares/verifyJwt.js";
import {
  deleteFile,
  downloadOneFile,
  getAllFiles,
  getOneFile,
  updateFile,
  uploadFile,
} from "../controllers/fileController.js";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(verifyJwt);

/**
 * @POST Upload a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/
 * @REQ_BODY => { file } -> the file you are upload. @MAX_SIZE - 16MB
 * @RES_BODY => { message, file } -> saved file
 */
router.post("/", upload.single("file"), uploadFile);

/**
 * @GET Get all files.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/
 * @RES_BODY => { message, files[] } -> array of files
 */
router.get("/", getAllFiles);

/**
 * @GET Get a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/:fileId -> id of the file
 * @RES_BODY => { message, data } -> data has file
 */
router.get("/:fileId", getOneFile);

/**
 * @GET Download a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/download/:fileId -> id of the file
 * @REQ_BODY => { type } -> send type of file you want, ex: pdf, docx etc
 * @RES_BODY => gives option/downloads file to your device
 */
router.get("/download/:fileId", downloadOneFile);

/**
 * @PATCH Update the name of a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/:fileId -> id of the file
 * @REQ_BODY => { name } -> updated name.
 * @RES_BODY => { message, file } -> update file
 */
router.patch("/:fileId", updateFile);

/**
 * @DELETE Delete a file.
 * @AUTH - REQUIRED
 * @ENDPOINT /api/file/:fileId -> id of the file
 * @RES_BODY => { message, file } -> deleted file for verification
 */
router.delete("/:fileId", deleteFile);

export default router;
