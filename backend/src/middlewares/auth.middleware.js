import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js"; 

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json(new ApiError(401, "Authentication required"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json(new ApiError(401, "Invalid token"));

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json(new ApiError(403, "Admin access only"));
  }
  next();
};
