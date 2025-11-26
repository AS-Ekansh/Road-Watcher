import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    full_name: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
