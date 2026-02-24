import { Router } from "express";
import { createBook } from "../controllers/bookController";
import { protect } from "../middleware/authMiddleware";
import { addReview } from "../controllers/reviewController";

const router = Router();

router.post("/", protect, createBook);
router.post("/:id/reviews", protect, addReview);

export default router;