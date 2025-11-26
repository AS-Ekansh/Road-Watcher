import { Report } from "../models/Report.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createReport = async (req, res) => {
  const imageUrl = req.file?.path || req.body.image_url || "https://via.placeholder.com/400";

  const report = await Report.create({
    ...req.body,
    user: req.user._id,
    image_url: imageUrl,
  });

  return res.json(new ApiResponse(201, report, "Report submitted successfully"));
};


export const getAllReports = async (req, res) => {
  const reports = await Report.find().populate("user", "full_name email");
  return res.json(new ApiResponse(200, reports));
};

export const getMyReports = async (req, res) => {
  const reports = await Report.find({ user: req.user._id });
  return res.json(new ApiResponse(200, reports));
};

export const updateReportStatus = async (req, res) => {
  const updated = await Report.findByIdAndUpdate(
    req.params.id,
    { ...req.body, solved_by: req.user._id, solved_at: new Date() },
    { new: true }
  );
  return res.json(new ApiResponse(200, updated, "Report updated"));
};
