import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Road Watcher API is Live");
});
import authRoutes from "./routes/auth.routes.js";
import reportRoutes from "./routes/report.routes.js";
import profileRoutes from "./routes/profile.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", reportRoutes);


export default app;
