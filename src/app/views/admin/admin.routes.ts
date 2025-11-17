import { Route } from "@angular/router";


export const adminRoutes: Route[] = [
    {
        path: 'budgets',
        loadChildren: () => import('@views/admin/budgets/budgets.routes').then((r) => r.budgetsRoutes)
    },
    {
        path: '',
        redirectTo: 'budgets',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        loadChildren: () => import('@views/admin/profile/profile.routes').then((r) => r.profileRoutes)
    }
]