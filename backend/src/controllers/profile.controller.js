import { Profile } from "../models/Profile.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getMyProfile = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  return res.json(new ApiResponse(200, profile));
};

export const updateMyProfile = async (req, res) => {
  const updated = await Profile.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    { new: true }
  );
  return res.json(new ApiResponse(200, updated, "Profile updated"));
};
