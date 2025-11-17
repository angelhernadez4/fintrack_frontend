import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { OperationalComponent } from '@core/abstracts/base-operational.component';
import { OperationCases } from '@core/interfaces';
import { BudgetPageState } from '@views/admin/budgets/interfaces/budgets-state.interface';
import { BudgetsService } from '../../services/budgets.service';
import { OPERATIONAL_IMPORTS } from '@core/utils';
import { BUDGET_FORM_CONTROLS_NAMES, BudgetForm } from '@views/admin/budgets/interfaces/budget-form.interface';
import { FormGroup, Validators } from '@angular/forms';
import { BudgetCore } from '@views/admin/budgets/interfaces/budget.interface';

@Component({
    selector: 'app-budget',
    imports: [OPERATIONAL_IMPORTS],
    standalone: true,
    templateUrl: './budget.component.html',
    styleUrl: './budget.component.scss'
})
export default class BudgetComponent extends OperationalComponent<BudgetPageState> implements OnInit, OnDestroy {
    private budgetService: BudgetsService = inject(BudgetsService);

    public formControlNames = BUDGET_FORM_CONTROLS_NAMES
    public form: FormGroup = this.fb.group({
        [BudgetForm.NAME]: ['', Validators.required],
        [BudgetForm.AMOUNT]: [null, Validators.required],
    })

    public state: WritableSignal<BudgetPageState> = signal({
        case: OperationCases.CREATE,
        loadingData: false,
        loadingSubmit: false,
        budgetId: '',
    })

    ngOnInit() {
        this.initialize(this.budgetService)
        this.updateState({ loadingData: true })
        this.setCase((_id) => this.getBudget(_id))
    }

    ngOnDestroy() {
        this.subs.forEach((s) => s.unsubscribe())
    }

    public submit() {
        if (this.isInvalidForm()) return;

        this.updateState({ loadingSubmit: true })

        const budget: BudgetCore = this.form.getRawValue();

        if (this.state().case === OperationCases.CREATE) {
            this.createBudget(budget)
            return
        }

        this.updateBudget(budget)

    }

    private createBudget(budget: BudgetCore) {
        this.budgetService.createBudget(budget).subscribe((success) => {
            this.updateState({ loadingSubmit: false })
            this.handleOperationRes(success)
        })
    }

    private updateBudget(budget: BudgetCore) {
        this.budgetService.updateBudget(budget, this.state().budgetId!).subscribe((success) => {
            this.updateState({ loadingSubmit: false });
            this.handleOperationRes(success)
        })
    }

    private getBudget(_id: string) {
        this.budgetService.getBudgetById(_id).subscribe((budget) => {
            if (this.hasGetError(budget)) return
            this.form.reset(budget)
            this.updateState({ loadingData: false, budgetId: _id })
        })
    }
}
