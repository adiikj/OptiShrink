import express from "express";
import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import morgan from "morgan";
import { corsOrigins, isProduction } from "./config/env.js";
import { checkDatabaseConnection } from "./db/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";
import imageRouter from "./routes/image.routes.js";
import pdfRouter from "./routes/pdf.routes.js";
import userRouter from "./routes/user.routes.js";

export const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new ApiError(403, "This origin is not allowed to use the API."));
  },
  credentials: true,
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true, limit: "64kb" }));
app.use(cookieParser());
app.use(morgan(isProduction ? "combined" : "dev"));

app.get("/health", async (_req, res, next) => {
  try {
    await checkDatabaseConnection();
    res.json({ success: true, status: 200, message: "ok" });
  } catch (error) {
    next(error);
  }
});

app.use("/user", userRouter);
app.use("/image", imageRouter);
app.use("/pdf", pdfRouter);

app.use(notFoundHandler);
app.use(errorHandler);
