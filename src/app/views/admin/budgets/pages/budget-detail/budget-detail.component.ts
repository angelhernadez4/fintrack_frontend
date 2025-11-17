import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { ReadComponent } from '@core/abstracts/base-read.component';
import { BudgetDetailState } from '@views/admin/budgets/interfaces/budgets-state.interface';
import { BudgetsService } from '@views/admin/budgets/services/budgets.service'
import { Budget } from '../../interfaces/budget.interface';
import { DETAIL_IMPORTS } from '@core/utils';
import { ExpenseComponent } from "@views/admin/expenses/pages/expense/expense.component";
import { Expense } from '@views/admin/expenses/interfaces/expense.interface';
import { Popover } from 'primeng/popover';
import { ExpenseListComponent } from "@views/admin/expenses/pages/expense-list/expense-list.component";

@Component({
    selector: 'app-budget-detail',
    imports: [DETAIL_IMPORTS, ExpenseComponent, ExpenseListComponent],
    standalone: true,
    templateUrl: './budget-detail.component.html',
    styleUrl: './budget-detail.component.scss'
})
export default class BudgetDetailComponent extends ReadComponent<BudgetDetailState> implements OnInit, OnDestroy{
    @ViewChild('op') op!: Popover;
    private budgetService: BudgetsService = inject(BudgetsService)

    public totalSpent: WritableSignal<number> = signal(0)
    public percentage: WritableSignal<number> = signal(0)
    public totalAvailable: WritableSignal<number> = signal(0)
    public budget: WritableSignal<Budget | undefined> = signal(undefined)
    public dialogVisible: WritableSignal<boolean> = signal(false)
    public expenseId: WritableSignal<string> = signal('')
    public budgetId: WritableSignal<string> = signal('')
    public dialogMode: WritableSignal<string> = signal('')
    public selectedExpense: WritableSignal<Expense | null> = signal(null)

    public visibleExpenses: WritableSignal<Expense[]> = signal([])
    public currentPage: WritableSignal<number> = signal(0)
    public rowsPerPage: WritableSignal<number> = signal(3)

    public state: WritableSignal<BudgetDetailState> = signal({
        loadingData: false
    })

    ngOnInit(): void {
        this.initialize(this.budgetService)
        const routeSub = this.readId((_id) => this.getBudget(_id)).subscribe()
        this.subs.push(routeSub)        
    }

    ngOnDestroy(): void {
        this.subs.forEach((s) => s.unsubscribe())
    }

    public getBudget(_id: string) {
        this.updateState({ loadingData: true })
        this.budgetService.getBudgetById(_id).subscribe((budget) => {
            if (this.hasGetError(budget)) return
            this.budget.set(budget as Budget)
            this.budgetId.set(_id)
            this.updateVisibleExpenses()

            this.totalSpent.set(this.budget()!.expenses.reduce((total, expense) => expense.amount + total, 0))
            this.totalAvailable.set(this.budget()!.amount - this.totalSpent())
            this.percentage.set(((this.totalSpent() / this.budget()!.amount) * 100))
            
            this.updateState({ loadingData: false })
        })
    }

    public openPopover(event: Event, expense: Expense, popover: any): void {
        this.selectedExpense.set(expense)
        popover.toggle(event);
    }

    public openDialog(mode: 'create' | 'edit', expenseId?: string) {
        this.dialogMode.set(mode)
        this.expenseId.set(expenseId ? expenseId : '');        
        this.dialogVisible.set(true)
    }

    public closeDialog(saved: boolean) {
        this.dialogVisible.set(false);
        if (saved) {
            this.getBudget(this.budgetId());
        }
    }

    private updateVisibleExpenses() {
        const totalExpenses = this.budget()!.expenses.length;
        const totalPages = Math.ceil(totalExpenses / this.rowsPerPage());
        // Si la página actual ya no existe, regresamos a la última página válida
        if (this.currentPage() >= totalPages && totalPages > 0) {
            this.currentPage.set(totalPages - 1);
        } else if (totalPages === 0) {
            this.currentPage.set(0);
        }
        const start = this.currentPage() * this.rowsPerPage()
        const end = start + this.rowsPerPage()
        this.visibleExpenses.set(this.budget()!.expenses.slice(start, end))
    }

    public onPageChange(event: any) {
        this.currentPage.set(event.page)
        this.rowsPerPage.set(event.rows)
        this.updateVisibleExpenses()
    }
}
