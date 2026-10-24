import { Router } from "express";
import { compressImages } from "../controllers/compression.controller.js";
import { optionalAuth } from "../middlewares/auth.middleware.js";
import { imageUpload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/optimize-img",
  imageUpload.fields([
    { name: "images", maxCount: 20 },
    { name: "image", maxCount: 1 },
  ]),
  optionalAuth,
  compressImages,
);

export default router;
