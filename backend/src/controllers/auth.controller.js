import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { Profile } from "../models/Profile.model.js";
import { sendSuccess, sendError } from "../utils/sendResponse.js";
import { generateToken, cookieOptions } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return sendError(res, 409, "Email already registered");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      phone,
      password: hashedPass,
    });

    await Profile.create({
      user: user._id,
      full_name,
      phone,
    });

    const token = generateToken(user._id);

    res.cookie("accessToken", token, cookieOptions);

    return sendSuccess(res, 201, "User registered successfully", {
      user,
      token,
    });

  } catch (err) {
    console.error("Register error:", err);
    return sendError(res, 500, "Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendError(res, 404, "User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return sendError(res, 401, "Incorrect password");

    const token = generateToken(user._id);

    res.cookie("accessToken", token, cookieOptions);

    return sendSuccess(res, 200, "Login successful", { user, token });

  } catch (err) {
    console.error("Login error:", err);
    return sendError(res, 500, "Internal server error");
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken");
  return sendSuccess(res, 200, "Logged out successfully");
};
