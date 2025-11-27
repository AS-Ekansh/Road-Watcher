import { Profile } from "../models/Profile.model.js";
import { sendSuccess, sendError } from "../utils/sendResponse.js";

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    return sendSuccess(res, 200, "Profile fetched", profile);
  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Failed to fetch profile");
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const updated = await Profile.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );

    return sendSuccess(res, 200, "Profile updated", updated);
  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Failed to update profile");
  }
};
