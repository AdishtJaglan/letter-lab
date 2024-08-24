import { Router } from "express";
import {
  getAccessToken,
  getNewAccessToken,
} from "../controllers/authController.js";
const router = Router();

/**
 * @POST verify credential and issue access and refresh tokens.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/auth/token
 * @REQ_BODY => { username, email } are required.
 * @RES_BODY => { message, accessToken, refreshToken }
 */
router.post("/token", getAccessToken);

/**
 * @POST verify refresh token and get another access token issued.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/auth/refresh
 * @REQ_BODY => { refreshToken } is required.
 * @RES_BODY => { message, accessToken }
 */
router.post("/refresh", getNewAccessToken);

export default router;
