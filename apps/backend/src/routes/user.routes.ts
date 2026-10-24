import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import { deleteFile, getStats, listFiles } from "../controllers/file.controller.js";
import { optionalAuth, requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", optionalAuth, logout);

router.get("/profile", requireAuth, getProfile);
router.get("/stats", requireAuth, getStats);
router.get("/files", requireAuth, listFiles);
router.delete("/files/:id", requireAuth, deleteFile);

export default router;
