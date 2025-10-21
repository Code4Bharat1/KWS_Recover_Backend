import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoute from "./src/routes/uploadRoute.js"
import {connectDB} from "./src/config/db.js"

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin : ["http://localhost:5173","https://api-kws.code4bharat.com"],
}));
app.use(express.json());
app.use("/public", express.static("public"));

// Connect DB
connectDB();

// Routes
app.use("/api/upload", uploadRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
