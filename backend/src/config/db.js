import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
        console.log("DB FILE LOADED at:", new Date().toISOString());
        console.log("Cloudinary ENV:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});
    } catch (error) {
        console.error("MongoDB Connection Error: ", error.message);
        process.exit(1); 
    }
};

export default connectDB;
