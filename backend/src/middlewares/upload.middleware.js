import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "road-reports",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB max
});
