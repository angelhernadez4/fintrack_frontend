import { CaseState, LoadingDataState, LoadingStates } from "@core/interfaces";

export interface BudgetPageState extends LoadingStates, CaseState {
    budgetId?: string;
}

export interface BudgetDetailState extends LoadingDataState{}