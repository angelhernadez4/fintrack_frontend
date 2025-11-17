import { CaseState, LoadingStates } from "@core/interfaces";

export interface ExpensePageState extends LoadingStates, CaseState {
    expenseId?: string;
}