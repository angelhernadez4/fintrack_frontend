import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { ListComponent } from '@core/abstracts/base-list.component';
import { LoadingDataState } from '@core/interfaces';
import { BudgetsService } from '@views/admin/budgets/services/budgets.service';
import { Budget } from '@views/admin/budgets/interfaces/budget.interface';
import { LIST_IMPORTS } from '@core/utils';
import { Popover } from 'primeng/popover';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-budgets-list',
    standalone: true,
    imports: [LIST_IMPORTS, ReactiveFormsModule],
    templateUrl: './budgets-list.component.html',
    styleUrl: './budgets-list.component.scss'
})
export default class BudgetsListComponent extends ListComponent<LoadingDataState> implements OnInit {
    @ViewChild('op') op!: Popover;
    private readonly budgetsService: BudgetsService = inject(BudgetsService);
    public override state: WritableSignal<LoadingDataState> = signal({ loadingData: false })

    public selectedBudget: WritableSignal<Budget | null> = signal(null)
    public budgets: WritableSignal<Budget[]> = signal([])
    public visibleBudgets: WritableSignal<Budget[]> = signal([]);
    public currentPage: WritableSignal<number> = signal(0);
    public rowsPerPage: WritableSignal<number> = signal(3);
    public deleteDialogVisible: WritableSignal<boolean> = signal(false)
    public deleteLoading: WritableSignal<boolean> = signal(false)

    public readonly fb: FormBuilder = inject(FormBuilder)
    public form: FormGroup = this.fb.group({
        password: ['', Validators.required]
    })

    ngOnInit(): void {
        this.initialize(this.budgetsService)
        this.getAll()
    }

    protected override getAll(): void {
        this.updateState({ loadingData: true })

        this.budgetsService.getBudgets().subscribe((budgets) => {
            if (this.hasGetAllError(budgets)) return;

            this.budgets.set(budgets as Budget[]);
            this.updateVisibleBudgets();
            this.updateState({ loadingData: false })
        })
    }

    private updateVisibleBudgets(): void {
        const totalBudgets = this.budgets().length;
        const totalPages = Math.ceil(totalBudgets / this.rowsPerPage());
        // Si la página actual ya no existe, regresamos a la última página válida
        if (this.currentPage() >= totalPages && totalPages > 0) {
            this.currentPage.set(totalPages - 1);
        } else if (totalPages === 0) {
            this.currentPage.set(0);
        }
        const start = this.currentPage() * this.rowsPerPage();        
        const end = start + this.rowsPerPage();        
        this.visibleBudgets.set(this.budgets().slice(start, end));        
    }

    public onPageChange(event: any): void {
        this.currentPage.set(event.page);
        this.rowsPerPage.set(event.rows);
        this.updateVisibleBudgets();
    }

    public openPopover(event: Event, budget: Budget, popover: any): void {
        this.selectedBudget.set(budget);
        popover.toggle(event);
    }

    public openDeleteDialog() {
        this.deleteDialogVisible.set(true)
    }

    public onDelete() {   
        if (this.form.invalid) return
        this.deleteLoading.set(true)
        const budget = this.selectedBudget() as Budget
        const { _id } = budget
        this.budgetsService.deleteBudget(this.form.getRawValue(), _id).subscribe((success) => {
            if (!success) {
                this.deleteLoading.set(false)
                this.deleteDialogVisible.set(true);
                return
            }
            this.handleDeleteRes(success)
            this.form.reset()
            this.deleteLoading.set(false)
            this.deleteDialogVisible.set(false);
        })
    }

    cancelDelete() {
        this.deleteDialogVisible.set(false);
        this.form.reset()
    }
}
