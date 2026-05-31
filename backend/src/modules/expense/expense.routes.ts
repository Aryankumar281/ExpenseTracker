import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import {
  createExpense,
//   getExpenses,
} from "./expense.controller";

const router = Router();

router.post("/", protect, createExpense);
// router.get("/", protect, getExpenses);

export default router;