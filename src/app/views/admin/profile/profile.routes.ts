import { Routes } from "@angular/router";
import { FragmentsRoutes } from "@core/utils";

export const profileRoutes: Routes = [
    {
        path: `${FragmentsRoutes.DETAIL}`,
        loadComponent: () => import('@views/admin/profile/pages/profile-detail/profile-detail.component')
    },
    {
        path: 'update-password',
        loadComponent: () => import('@views/admin/profile/pages/profile-update-password/profile-update-password.component')
    },
    {
        path: `${FragmentsRoutes.UPDATE}/:_id`,
        loadComponent: () => import('@views/admin/profile/pages/profile/profile.component')
    }
]