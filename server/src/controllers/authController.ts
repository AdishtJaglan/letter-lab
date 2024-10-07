import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

/**
 * @POST verify credential and issue access and refresh tokens.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/auth/token
 * @REQ_BODY => { username, email } are required.
 * @RES_BODY => { message, accessToken, refreshToken }
 */
export const getAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!refreshTokenSecret || !accessTokenSecret) {
      res.status(500).json({ message: "Server configuration error." });
      return;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });

    res.status(200).json({
      message: "Credentials valid. Autheniticated.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error while authenticating.", error: error.message });
      return;
    }

    res.status(500).json({ message: "Error while authenticating." });
  }
};

/**
 * @POST verify refresh token and get another access token issued.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/auth/refresh
 * @REQ_BODY => { refreshToken } is required.
 * @RES_BODY => { message, accessToken }
 */
export const getNewAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!refreshTokenSecret || !accessTokenSecret) {
      res.status(500).json({ message: "Server configuration error." });
      return;
    }

    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: "Refresh token is required." });
      return;
    }

    jwt.verify(
      refreshToken,
      refreshTokenSecret,
      (
        error: VerifyErrors | null,
        decoded: JwtPayload | string | undefined
      ) => {
        if (error || !decoded || typeof decoded === "string") {
          res.status(401).json({ message: "Invalid refresh token." });
          return;
        }

        const { userId } = decoded as CustomJwtPayload;

        if (!userId) {
          res.status(401).json({ message: "Invalid token payload." });
          return;
        }

        const accessToken = jwt.sign({ userId }, accessTokenSecret, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        });

        res.status(200).json({
          message: "Refresh token valid. Authenticated.",
          accessToken,
        });
        return;
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error issuing access token.", error: error.message });
      return;
    }

    res.status(500).json({ message: "Error issuing access token." });
  }
};

/**
 * @POST Verify JWT Tokens
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/auth/verify
 * @REQ_BODY { accessToken, refreshToken }
 * @RES_BODY { accessToken, refreshToken } -> contains information regarding validity of each token.
 *                                            If valid, contains a user object with userID
 */
export const verifyAccessAndRefreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!refreshTokenSecret || !accessTokenSecret) {
      res.status(500).json({ message: "Server configuration error." });
      return;
    }

    const { accessToken, refreshToken } = req.body;

    if (!accessToken && !refreshToken) {
      res.status(400).json({ message: "Tokens missing. Invalid request." });
      return;
    }

    const response: {
      accessToken?: {
        valid: boolean;
        message: string;
        user?: JwtPayload | string;
      };
      refreshToken?: {
        valid: boolean;
        message: string;
        user?: JwtPayload | string;
      };
    } = {};

    if (accessToken) {
      jwt.verify(
        accessToken,
        accessTokenSecret,
        (
          error: VerifyErrors | null,
          decoded: JwtPayload | string | undefined
        ) => {
          if (error) {
            response.accessToken = {
              valid: false,
              message: "Access token invalid.",
            };
          } else {
            response.accessToken = {
              valid: true,
              message: "Access token valid.",
              user: decoded,
            };
          }
        }
      );
    }

    if (refreshToken) {
      jwt.verify(
        refreshToken,
        refreshTokenSecret,
        (
          error: VerifyErrors | null,
          decoded: JwtPayload | string | undefined
        ) => {
          if (error) {
            response.refreshToken = {
              valid: false,
              message: "Refresh token invalid.",
            };
          } else {
            response.refreshToken = {
              valid: true,
              message: "Refresh token valid.",
              user: decoded,
            };
          }
        }
      );
    }

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error verifying access token.",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error verifying access token.",
    });
  }
};
