import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { Profile } from "../models/Profile.model.js";
import { ApiError } from "../utils/ApiError.js";  
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { generateToken, cookieOptions } from "../utils/generateToken.js"; 

export const register = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        status: 409,
        message: "Email already registered"
      });
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

    return res
      .cookie("accessToken", token, cookieOptions)
      .status(201)
      .json({
        status: 201,
        message: "Registered",
        user,
        token
      });

  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect password"
      });
    }

    const token = generateToken(user._id);

    return res
      .cookie("accessToken", token, cookieOptions)
      .json({
        status: 200,
        message: "Login successful",
        user,
        token
      });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error"
    });
  }
};


export const logout = async (req, res) => {
  return res.clearCookie("accessToken").json(new ApiResponse(200, {}, "Logged out"));
};
