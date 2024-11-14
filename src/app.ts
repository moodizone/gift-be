import express, { ErrorRequestHandler } from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import httpErrors from "http-errors";
import { config } from "dotenv";

import usersRouter from "./routes/users";
import { pool } from "./configs/db";

config();
const port = Number(process.env.APP_PORT);
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
app.use("/api/users", usersRouter);

// wild card routes
app.use(function (_req, _res, next) {
  next(httpErrors.NotFound());
});

// default error handler
app.use(((err, _req, res, _next) => {
  if (err instanceof APIError) {
    console.error("🚫 Default APIError handler:\n", err.message);
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error("🚫 Default error handler:\n", err.stack);
    res
      .status(500)
      .json({ message: "Something went wrong, That's all we know!" });
  }
}) as ErrorRequestHandler);

app.listen(port, () => {
  console.log(`✅ App is running at port ${port}`);

  pool.connect((err, _client, release) => {
    if (err) {
      return console.error("🚫 Database connection failed:\n", err.stack);
    }

    console.log("✅ Connected to the database");
    release();
  });
});

export default app;
