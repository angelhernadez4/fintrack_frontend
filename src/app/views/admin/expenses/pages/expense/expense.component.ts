import { Component, inject, input, OnChanges, OnDestroy, OnInit, output, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { OperationalComponent } from '@core/abstracts/base-operational.component';
import { OPERATIONAL_IMPORTS } from '@core/utils';
import { ExpensePageState } from '../../interfaces/expense-state.interface';
import { ExpensesService } from '../../services/expenses.service';
import { EXPENSE_FORM_CONTROLS_NAMES, ExpenseForm } from '../../interfaces/expense-form.interface';
import { FormGroup, Validators } from '@angular/forms';
import { OperationCases } from '@core/interfaces';
import { ExpenseCore } from '../../interfaces/expense.interface';

@Component({
    selector: 'app-expense',
    imports: [OPERATIONAL_IMPORTS],
    templateUrl: './expense.component.html',
    styleUrl: './expense.component.scss'
})
export class ExpenseComponent extends OperationalComponent<ExpensePageState> implements OnInit, OnDestroy, OnChanges {
    private expenseService: ExpensesService = inject(ExpensesService)

    public onClose = output<boolean>();
    public visible = input<boolean>(false);
    public mode = input<string>('')
    public idExpense = input<string>('')
    public idBudget = input<string>('')

    public formControlNames = EXPENSE_FORM_CONTROLS_NAMES
    public form: FormGroup = this.fb.group({
        [ExpenseForm.NAME]: ['', Validators.required],
        [ExpenseForm.AMOUNT]: [null, Validators.required]
    })

    public state: WritableSignal<ExpensePageState> = signal({
        case: OperationCases.CREATE,
        loadingData: false,
        loadingSubmit: false,
        expenseId: '',
        budgetId: ''
    }) 

    ngOnInit(): void {
        this.initialize(this.expenseService)        
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Si cambia el modo
        if (changes['mode'] && this.mode()) {
            this.updateState({ loadingData: true });
            if (this.mode() === 'create') {
                this.form.reset()
                this.updateState({ case: OperationCases.CREATE, loadingData: false });
            }
        }

        // Si cambia el idExpense y estamos en modo editar
        if (this.mode() === 'edit' && changes['idExpense'] && this.idExpense()) {
            this.updateState({ case: OperationCases.UPDATE, loadingData: true });
            this.getExpense(this.idExpense());
        }
    }


    ngOnDestroy(): void {
        this.subs.forEach((s) => s.unsubscribe())
    }

    public close() {
        this.onClose.emit(false);
    }

    public submit() {
        if (this.isInvalidForm()) return;
        this.updateState({ loadingSubmit: true })
        const expense: ExpenseCore = this.form.getRawValue()

        if (this.state().case === OperationCases.CREATE) {
            this.createExpense(this.idBudget(), expense)
            return
        }

        this.updateExpense(this.idBudget(), expense)
    }

    private createExpense(idBudget: string, expense: ExpenseCore) {
        this.expenseService.createExpense(idBudget, expense).subscribe((success) => {
            this.updateState({ loadingSubmit: false, budgetId: this.idBudget()  })
            this.handleOperationRes(success)
            this.form.reset()
            this.onClose.emit(true)
        })
    }

    private updateExpense(idBudget: string, expense: ExpenseCore) {
        this.expenseService.updateExpense(idBudget, expense, this.idExpense()).subscribe((success) => {
            this.updateState({ loadingSubmit: false, budgetId: this.idBudget() })
            if (!success) {
                this.handleOperationRes(success)
                return
            }
            this.handleOperationRes(success)
            this.onClose.emit(true)
        })
    }

    private getExpense(idExpense: string) {
        this.expenseService.getExpenseById(idExpense).subscribe((expense) => {
            if (this.hasGetError(expense)) return
            this.form.reset(expense)
            this.updateState({ loadingData: false, budgetId: this.idBudget() })
        })
    }
}
