import { Router } from "express";
import { createBook } from "../controllers/bookController";
import { protect } from "../middleware/authMiddleware";
import {getBooks} from "../controllers/bookController";
import {getBookById} from "../controllers/bookController";
import {updateBook} from "../controllers/bookController";
import {deleteBook} from "../controllers/bookController";
const router = Router();

router.post("/", protect, createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;