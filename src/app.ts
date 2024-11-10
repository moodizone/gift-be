import express, { ErrorRequestHandler } from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import httpErrors from "http-errors";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const port = 3002;
const app = express();

// logger for all http requests in dev
app.use(logger("dev"));

// extract cookies from headers and populate to request object
app.use(cookieParser());

// virtual `/assets` path
app.use("/assets", express.static(path.join(__dirname, "public")));

// page routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// wild card routes
app.use(function (_req, _res, next) {
  next(httpErrors.NotFound());
});

// error handler
app.use(((err, _req, res, _next) => {
  console.error(err.stack);
  // render the error page
  res.status(err.status || 500);
  res.render("Something went wrong, That's all we know");
}) as ErrorRequestHandler);

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

export default app;
