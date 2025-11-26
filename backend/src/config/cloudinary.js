import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); 
import { v2 as cloudinary } from "cloudinary";
console.log("Cloudinary FILE LOADED at:", new Date().toISOString());
console.log("Cloudinary ENV:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
