import express from "express";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

import {
  createReport,
  getAllReports,
  getMyReports,
  updateReportStatus
} from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", auth, upload.single("image"), createReport);
router.get("/mine", auth, getMyReports);

router.get("/", auth, isAdmin, getAllReports);
router.patch("/:id", auth, isAdmin, updateReportStatus);

export default router;
