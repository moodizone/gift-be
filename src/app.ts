import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import httpErrors from "http-errors";
import cors from "cors";

import userRouter from "./routes/user";
import { errorHandler } from "./middlewares/error-handler";
import { authentication } from "./middlewares/authenticate";
import { appPort } from "./configs";
import authRouter from "./routes/auth";

const app = express();

// for parsing application/json
app.use(express.json());

// logger for all http requests in dev
app.use(logger("dev"));

// extract cookies from headers and populate to request object
app.use(cookieParser());

// virtual `/assets` path
app.use("/assets", express.static(path.join(__dirname, "public")));

// enable CORS for a specific origin (Next.js app on port 3006)
app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "production"
        ? "https://www.mojave-desert.ir"
        : "http://localhost:3006",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// page routes
app.use("/api/auth", authRouter);
app.use("/api/user", authentication, userRouter);

// wild card routes
app.use(function (_req, _res, next) {
  next(httpErrors.NotFound());
});

// error handler
app.use(errorHandler as express.ErrorRequestHandler);

app.listen(appPort, () => {
  console.log(`✅ App is running at port ${appPort}`);
});

export default app;
