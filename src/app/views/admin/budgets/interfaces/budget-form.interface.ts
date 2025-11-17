export enum BudgetForm {
    NAME = 'name',
    AMOUNT = 'amount'
}

export const BUDGET_FORM_CONTROLS_NAMES: Record<keyof typeof BudgetForm, BudgetForm> = {
    NAME: BudgetForm.NAME,
    AMOUNT: BudgetForm.AMOUNT
}