import express from "express";
import path from "path";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

// virtual `/assets` path
app.use("/assets", express.static(path.join(__dirname, "public")));

// page routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(3002, () => {
  console.log(`App is running at port ${3002}`);
});

export default app;
