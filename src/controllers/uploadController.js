import User from "../models/user.js";

export const uploadFile = async (req, res) => {
  try {
    const { KWS_ID } = req.body;
    const filePath = req.file ? `/public/${req.file.filename}` : null;

    if (!KWS_ID || !filePath) {
      return res.status(400).json({ message: "KWS_ID and profile photo required" });
    }

    // Check if KWS_ID already exists
    const existingUser = await User.findOne({ KWS_ID });
    if (existingUser) {
      existingUser.profilePhoto = filePath;
      await existingUser.save();
      return res.status(200).json({
        message: "Profile photo updated successfully",
        data: existingUser,
      });
    }

    // Create a new user record
    const newUser = await User.create({
      KWS_ID,
      profilePhoto: filePath,
    });

    res.status(201).json({
      message: "Upload successful",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};