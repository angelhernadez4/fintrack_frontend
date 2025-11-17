import { Timestamps } from "@core/interfaces";
import { BudgetCore } from "@views/admin/budgets/interfaces/budget.interface";

export interface Expense extends Timestamps {
    _id: string;
    name: string;
    amount: number;
    budget: string;
}

export interface ExpenseCore extends BudgetCore {}