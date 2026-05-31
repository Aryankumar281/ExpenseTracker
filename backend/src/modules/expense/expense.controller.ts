import { Response } from "express";
import { AuthRequest } from "../../types/express";

export const createExpense = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.user?.userId;

  console.log(userId);

  res.json({
    message: "Expense created",
    userId,
  });
};