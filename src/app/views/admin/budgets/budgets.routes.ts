import { Routes } from "@angular/router";
import { FragmentsRoutes } from "@core/utils/base-routing";

export const budgetsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('@views/admin/budgets/pages/budgets-list/budgets-list.component')
    },
    {
        path: FragmentsRoutes.CREATE,
        loadComponent: () => import('@views/admin/budgets/pages/budget/budget.component')
    },
    {
        path: `${FragmentsRoutes.UPDATE}/:_id`,
        loadComponent: () => import('@views/admin/budgets/pages/budget/budget.component')
    },
    {
        path: `${FragmentsRoutes.DETAIL}/:_id`,
        loadComponent: () => import('@views/admin/budgets/pages/budget-detail/budget-detail.component')
    }
]