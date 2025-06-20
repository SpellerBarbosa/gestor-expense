import mongoose, { Schema, Types } from "mongoose";
import { IExpense } from "../interfaces/interfaces";

const expenseSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    payment:{
      type: String
    },
    date:{
      type: Date
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);
export default Expense;
