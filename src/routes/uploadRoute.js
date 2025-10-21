import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/"),
    filename: (req, file, cb) => {
        const KWS_ID = req.body.KWS_ID || Date.now(); // fallback in case missing
        const ext = file.originalname.split(".").pop(); // get file extension
        cb(null, `${KWS_ID}.${ext}`);
    },
});

const upload = multer({ storage });

// Route: POST /api/upload
router.post("/", upload.single("profilePhoto"), uploadFile);

export default router;