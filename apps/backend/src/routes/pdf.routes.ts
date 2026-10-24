import { Router } from "express";
import { compressPdfFile } from "../controllers/compression.controller.js";
import { optionalAuth } from "../middlewares/auth.middleware.js";
import { pdfUpload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/compress-pdf", pdfUpload.single("file"), optionalAuth, compressPdfFile);

export default router;
