import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { loginGuard } from '@core/guards/login.guard';
import { adminRoutes } from '@views/admin/admin.routes';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [loginGuard],
        loadComponent: () => import('@layouts/auth-layout/auth-layout.component'),
        children: [
            {
                path: 'login',
                loadComponent: () => import('@views/auth/login/login.component')
            },
            {
                path: 'register',
                loadComponent: () => import('@views/auth/register/register.component')
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('@views/auth/forgot-password/forgot-password.component')
            },
            {
                path: 'confirm-account',
                loadComponent: () => import('@views/auth/confirm-account/confirm-account.component')
            },
            {
                path: 'new-password',
                loadComponent: () => import('@views/auth/new-password/new-password.component')
            }
        ]
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () => import('@layouts/admin-layout/admin-layout.component'),
        children: adminRoutes
    },
    {
        path: '',
        loadComponent: () => import('@views/home/home.component')
    }
];
