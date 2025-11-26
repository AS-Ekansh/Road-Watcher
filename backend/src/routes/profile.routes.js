import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getMyProfile, updateMyProfile } from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", auth, getMyProfile);
router.put("/me", auth, updateMyProfile);

export default router;
