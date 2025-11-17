import { Component, inject, input, OnInit, output, signal, WritableSignal } from '@angular/core';
import { ListComponent } from '@core/abstracts/base-list.component';
import { LoadingDataState } from '@core/interfaces';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../interfaces/expense.interface';
import { LIST_IMPORTS } from '@core/utils';
import { tap } from 'rxjs';

@Component({
    selector: 'app-expense-list',
    imports: [LIST_IMPORTS],
    templateUrl: './expense-list.component.html',
    styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent extends ListComponent<LoadingDataState> implements OnInit {
    public Expense = input<Expense>()
    public budgetId = input<string>('')
    public onDeleted = output<void>();
    private expenseService: ExpensesService = inject(ExpensesService)

    public expense: WritableSignal<Expense[]> = signal([])
    public override state: WritableSignal<LoadingDataState> = signal({
        loadingData: false
    })

    ngOnInit(): void {
        this.initialize(this.expenseService)
        this.getAll()
    }

    public onDelete(expense: Expense) {   
        if (this.budgetId()) {
            const { _id, name } = expense
            const id = _id
            const delete$ = this.expenseService.deleteExpense(this.budgetId(), _id).pipe(
                tap((success) => {
                    if (success) {
                        this.onDeleted.emit(); // 👈 Emitimos evento si se eliminó correctamente
                    }
                })
            );

            // luego se lo pasamos normalmente a showConfirmDelete()
            this.showConfirmDelete(name, id, delete$);
            // this.showConfirmDelete(name, id, this.expenseService.deleteExpense(this.budgetId(), _id))
        }

    }

    protected override getAll(): void {
        
    }
}
