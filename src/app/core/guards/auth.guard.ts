import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = () : boolean => {
    const authService: AuthService = inject(AuthService);

    if (!authService.isLoggedIn()) {
        authService.redirectToLogin()
    }
    return authService.isLoggedIn();
};
