import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

// Absolute upload directory path
const uploadDir = path.join(process.cwd(), "public");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const KWS_ID = req.body.KWS_ID || Date.now(); // fallback if missing
    const ext = path.extname(file.originalname); // keep original extension
    cb(null, `${KWS_ID}${ext}`);
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post("/", upload.single("profilePhoto"), uploadFile);

export default router;
