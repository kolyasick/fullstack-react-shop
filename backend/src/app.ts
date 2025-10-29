import express from "express";
import router from "./routes";
import logger from "./middlewares/logger";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/errorHandler";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "Server is running! Use /api endpoints" });
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);

export default app;
