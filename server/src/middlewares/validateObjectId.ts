import { isValidObjectId } from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id, userId, templateId } = req.params;
  const identifier = id || userId || templateId;

  if (!identifier) {
    return res.status(400).json({ message: "No identifier received." });
  }

  if (!isValidObjectId(identifier)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};

export default validateObjectId;
