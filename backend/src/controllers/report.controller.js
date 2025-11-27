import { Report } from "../models/Report.model.js";
import { sendSuccess, sendError } from "../utils/sendResponse.js";

export const createReport = async (req, res) => {
  try {
    const imageUrl =
      req.file?.path || req.body.image_url || "https://via.placeholder.com/400";

    const report = await Report.create({
      ...req.body,
      user: req.user._id,
      image_url: imageUrl,
    });

    return sendSuccess(res, 201, "Report submitted successfully", report);

  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Failed to create report");
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "full_name email");
    return sendSuccess(res, 200, "Reports fetched", reports);

  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Failed to fetch reports");
  }
};

export const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id });
    return sendSuccess(res, 200, "My reports fetched", reports);

  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Failed to fetch my reports");
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(
      req.params.id,
      { ...req.body, solved_by: req.user._id, solved_at: new Date() },
      { new: true }
    );

    return sendSuccess(res, 200, "Report updated", updated);

  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Failed to update report");
  }
};
