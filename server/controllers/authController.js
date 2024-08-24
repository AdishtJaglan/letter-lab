import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

/**
 * @POST verify credential and issue access and refresh tokens.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/token
 * @REQ_BODY => { username, email } are required.
 * @RES_BODY => { message, accessToken, refreshToken }
 */
export const getAccessToken = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    res.status(200).json({
      message: "Credentials valid. Autheniticated.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while authenticating.", error: error.message });
  }
};

/**
 * @POST verify refresh token and get another access token issued.
 * @AUTH - NOT REQUIRED
 * @ENDPOINT /api/refresh
 * @REQ_BODY => { refreshToken } is required.
 * @RES_BODY => { message, accessToken }
 */
export const getNewAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required." });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: "Invalid refresh token." });
        }

        const accessToken = jwt.sign(
          { userId: decoded.userId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        return res.status(200).json({
          message: "Refresh token valid. Authenticated.",
          accessToken,
        });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error issuing access token.", error: error.message });
  }
};
