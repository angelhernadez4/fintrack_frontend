export enum ExpenseForm {
    NAME = 'name',
    AMOUNT = 'amount'
}

export const EXPENSE_FORM_CONTROLS_NAMES: Record<keyof typeof ExpenseForm, ExpenseForm> = {
    NAME: ExpenseForm.NAME,
    AMOUNT: ExpenseForm.AMOUNT
}