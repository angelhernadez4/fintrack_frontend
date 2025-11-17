import { inject, Injectable } from '@angular/core';
import { BaseService } from '@core/abstracts/base.service';
import { ErrorsMap, GenericBackendResponse, GetAllObs, GetOneObs, SuccessObs } from '@core/interfaces';
import { CATALOG_ENDPOINTS } from '@views/admin/utils/api-endpoints';
import { Admin } from '@views/admin/utils/base-routes';
import { catchError, map, of, switchMap } from 'rxjs';
import { Budget, BudgetCore } from '@views/admin/budgets/interfaces/budget.interface';
import { environment as ENV } from '@environments/environments';
import { NotificationService } from '@core/services/notification.service';
import { ProfileService } from '@views/admin/profile/services/profile.service';

@Injectable({
   providedIn: 'root'
})
export class BudgetsService extends BaseService {
    private notificationService: NotificationService = inject(NotificationService)
    private profileService: ProfileService = inject(ProfileService)

    constructor() {
        super({
            baseRoute: Admin.BUDGETS,
            baseEndpoint: CATALOG_ENDPOINTS.budgets,
            singularName: 'presupuesto',
            fatherRoute: '/admin'
        })
    }

    public getBudgets() : GetAllObs<Budget> {
        const url: string = `${this.base_url}`;
        return this.http.get<{ success: boolean; budgets: Budget[] }>(url).pipe(
            map((res) => res.budgets),
            catchError(() => of(null))
        )
    }

    public getBudgetById(budgetId: string): GetOneObs<Budget> {
        const url: string = `${this.base_url}/${budgetId}`
        return this.http.get<{success: boolean, budget: Budget}>(url).pipe(
            map((res) => (!res.budget ? ErrorsMap.ELEMENT_NOT_EXIST : res.budget)),
            catchError(() => of(null))
        )
    }

    public deleteBudget(password: string, _id: string): SuccessObs {
        return this.profileService.checkPassword(password).pipe(
            switchMap((isValid) => {
                if (isValid) {
                    const url: string = `${this.base_url}/${_id}`;
                    return this.http.delete<GenericBackendResponse>(url).pipe(
                        map((res) => res.success),
                        catchError(() => of(false))
                    )
                } else {
                    return of(false);
                }
            }),
            catchError(() => of(false))
        )
    }

    public createBudget(budget: BudgetCore): SuccessObs {
        const url: string = `${this.base_url}`
        return this.http.post<GenericBackendResponse>(url, budget).pipe(
            map((res) => {
                return res.success
            }),
            catchError(() => of(false))
        )
    }

    public updateBudget(budget: BudgetCore, budget_id: string): SuccessObs {
        const url: string = `${this.base_url}/${budget_id}`
        return this.http.patch<GenericBackendResponse>(url, budget).pipe(
            map((res) => res.success),
            catchError(() => of(false))
        )
    }

    public delete(_id: string) {
        const url: string = `${this.base_url}/${_id}`;
        return this.http.delete<GenericBackendResponse>(url).pipe(
            map((res) => res.success),
            catchError(() => of(false))
        )
    }
}
