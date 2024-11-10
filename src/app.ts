import express from "express";
import path from "path";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

// logger for all http requests in dev
app.use(logger("dev"));

// virtual `/assets` path
app.use("/assets", express.static(path.join(__dirname, "public")));

// page routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(3002, () => {
  console.log(`App is running at port ${3002}`);
});

export default app;
