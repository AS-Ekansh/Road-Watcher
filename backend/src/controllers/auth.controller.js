import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { Profile } from "../models/Profile.model.js";
import { sendSuccess, sendError } from "../utils/sendResponse.js";
import { generateToken, cookieOptions } from "../utils/generateToken.js";

// auth.controller.js (replace register with this)
import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { Profile } from "../models/Profile.model.js";
import { sendSuccess, sendError } from "../utils/sendResponse.js";
import { generateToken, cookieOptions } from "../utils/generateToken.js";

/**
 * Robust register:
 * - validates required fields
 * - creates user
 * - tries to create profile; if profile creation fails, deletes the user (rollback)
 * - sets cookie and returns 201 on success
 */
export const register = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    // 1) Validate input early
    if (!full_name || !email || !password) {
      return sendError(res, 400, "full_name, email and password are required");
    }

    // 2) Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return sendError(res, 409, "Email already registered");
    }

    // 3) Hash and create user
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      full_name,
      email,
      phone,
      password: hashedPass,
    });

    // 4) Try to create profile. If it fails, rollback user.
    try {
      await Profile.create({
        user: user._id,
        full_name,
        phone,
      });
    } catch (profileErr) {
      console.error("Profile creation failed, rolling back user:", profileErr);
      // rollback user to avoid orphaned user without profile
      try {
        await User.findByIdAndDelete(user._id);
      } catch (delErr) {
        console.error("Failed to rollback user after profile failure:", delErr);
      }
      return sendError(res, 400, "Failed to create profile - registration aborted");
    }

    // 5) Generate token and set cookie
    const token = generateToken(user._id);
    res.cookie("accessToken", token, cookieOptions);

    // 6) Success
    return sendSuccess(res, 201, "User registered successfully", { user, token });

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
