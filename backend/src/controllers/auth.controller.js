import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { Profile } from "../models/Profile.model.js";
import { ApiError } from "../utils/ApiError.js";  
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { generateToken, cookieOptions } from "../utils/generateToken.js"; 

export const register = async (req, res) => {
  const { full_name, email, phone, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) res.status(400).json(new ApiError(409, "Email already registered"));

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await User.create({
    full_name, email, phone, password: hashedPass,
  });

  // create profile (like trigger in SQL)
  await Profile.create({
    user: user._id,
    full_name,
    phone,
  });

  const token = generateToken(user._id);

  res
    .cookie("accessToken", token, cookieOptions)
    .json(new ApiResponse(201, { user, token }, "Registered successfully"));
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) res.status(404).json(new ApiError(404, "User not found"));

  const match = await bcrypt.compare(password, user.password);
  if (!match) res.status(401).json(ApiError(401, "Incorrect password"));

  const token = generateToken(user._id);

  res.cookie("accessToken", token, cookieOptions)
    .json(new ApiResponse(200, { user, token }, "Login successful"));
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken").json(new ApiResponse(200, {}, "Logged out"));
};
