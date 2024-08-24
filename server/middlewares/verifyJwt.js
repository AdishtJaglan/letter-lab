import jwt from "jsonwebtoken";

const veriftJwt = async (req, res, next) => {
  const authHeader = req.headers["Authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Invalid header." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing." });
  }

  jwt.verify(token, "lmaoded", (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden, invalid token." });
    }

    req.user = decoded;
    next();
  });
};

export default veriftJwt;
