import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    KWS_ID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);