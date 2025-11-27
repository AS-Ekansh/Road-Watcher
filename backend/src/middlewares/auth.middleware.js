import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { sendError } from "../utils/sendResponse.js";

export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return sendError(res, 401, "Authentication required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return sendError(res, 401, "Invalid token");
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("Auth error:", err);
    return sendError(res, 401, "Invalid or expired token");
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return sendError(res, 403, "Admin access only");
  }
  next();
};
