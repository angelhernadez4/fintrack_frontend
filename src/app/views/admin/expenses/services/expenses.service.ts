import { inject, Injectable } from '@angular/core';
import { BaseService } from '@core/abstracts/base.service';
import { NotificationService } from '@core/services/notification.service';
import { Admin } from '../../utils/base-routes';
import { CATALOG_ENDPOINTS } from '../../utils/api-endpoints';
import { ErrorsMap, GenericBackendResponse, GetOneObs, SuccessObs } from '@core/interfaces';
import { Expense, ExpenseCore } from '../interfaces/expense.interface';
import { catchError, of, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExpensesService extends BaseService{
    constructor() {
        super({
            baseRoute: Admin.EXPENSES,
            baseEndpoint: CATALOG_ENDPOINTS.expenses,
            singularName: 'gasto',
            fatherRoute: '/admin'
        })
    }

    public getExpenseById(expenseId: string): GetOneObs<Expense> {
        const url: string = `${this.base_url}/${expenseId}`
        return this.http.get<{success: boolean, expense: Expense}>(url).pipe(
            map((res) => (!res.expense ? ErrorsMap.ELEMENT_NOT_EXIST : res.expense)),
            catchError(() => of(null))
        )
    }

    public deleteExpense(idBudget: string, _id: string): SuccessObs {
        const url: string = `${this.base_url}/${idBudget}/expenses/${_id}`
        return this.http.delete<GenericBackendResponse>(url).pipe(
            map((res) => res.success),
            catchError(() => of(false))
        )
    }

    public createExpense(idBudget: string, expense: ExpenseCore) : SuccessObs {
        const url: string = `${this.base_url}/${idBudget}`        
        return this.http.post<GenericBackendResponse>(url, expense).pipe(
            map((res) => res.success),
            catchError(() => of(false))
        )
    }

    public updateExpense(idBudget : string, expense: ExpenseCore, expense_id: string): SuccessObs {
        const url: string = `${this.base_url}/${expense_id}`
        return this.http.patch<GenericBackendResponse>(url, expense).pipe(
            map((res) => res.success),
            catchError(() => of(false))
        )
    }
}
