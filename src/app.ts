import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import httpErrors from "http-errors";

import usersRouter from "./routes/users";
import { errorHandler } from "./middlewares/error-handler";
import { authentication } from "./middlewares/authenticate";
import { appPort } from "./configs/env";
import authRouter from "./routes/auth";

const app = express();

// logger for all http requests in dev
app.use(logger("dev"));

// extract cookies from headers and populate to request object
app.use(cookieParser());

// virtual `/assets` path
app.use("/assets", express.static(path.join(__dirname, "public")));

// for parsing application/json
app.use(express.json());

// page routes
app.use("/api/auth", authRouter);
app.use("/api/users", authentication, usersRouter);

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
