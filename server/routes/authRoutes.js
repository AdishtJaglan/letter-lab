import { Router } from "express";
import {
  getAccessToken,
  getNewAccessToken,
  verifyAccessAndRefreshTokens,
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

/**
 * @POST Verify JWT Tokens
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/auth/verify
 * @REQ_BODY { accessToken, refreshToken }
 * @RES_BODY { accessToken, refreshToken } -> contains information regarding validity of each token.
 *                                            If valid, contains a user object with userID
 */
router.post("/verify", verifyAccessAndRefreshTokens);

export default router;
