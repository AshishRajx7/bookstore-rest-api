import express from "express";
import authRoutes from "./routes/authRoutes";
const app = express();

app.get("/", (req, res) => res.send("OK"));
app.use("/api/auth", authRoutes);

export default app;