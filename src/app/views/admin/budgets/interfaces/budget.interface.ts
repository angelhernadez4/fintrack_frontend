import { Timestamps } from "@core/interfaces";
import { Expense } from "@views/admin/expenses/interfaces/expense.interface";

export interface Budget extends Timestamps {
    _id: string;
    name: string;
    amount: number;
    userId: string;
    expenses: Expense[];
}

export interface BudgetCore {
    name: string;
    amount: number;
}