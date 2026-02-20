import { Router } from "express";
import { createBook } from "../controllers/bookController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createBook);

export default router;