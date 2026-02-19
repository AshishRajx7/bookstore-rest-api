import express from "express";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("OK"));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);


export default app;