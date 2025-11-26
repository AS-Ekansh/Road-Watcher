import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    image_url: { type: String, required: true },
    description: { type: String, required: true },

    latitude: { type: String, required: true },
    longitude: { type: String, required: true },

    location_address: { type: String },

    danger_level: {
      type: String,
      enum: ["moderate", "severe"],
      default: "moderate"
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "solved"],
      default: "pending"
    },

    solved_at: { type: Date },
    solved_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    admin_notes: { type: String },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
