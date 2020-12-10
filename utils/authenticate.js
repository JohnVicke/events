import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

const getToken = (header) => {
  const parts = header.split(" ");
  if (parts.length === 2) {
    if (/^Bearer$/i.test(parts[0])) {
      return parts[1];
    }
  }
  return null;
};

const decodeToken = (req, requireAuth = true) => {
  const header = req.headers.authorization;

  if (header) {
    const token = getToken(header);
    if (!token) {
      throw new Error("Verification of authentication scheme failed");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  }

  if (requireAuth) {
    throw new Error("Login to access resource");
  }

  return null;
};

export default decodeToken;
