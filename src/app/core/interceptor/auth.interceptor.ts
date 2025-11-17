import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthStorageKeys } from "@core/interfaces";
import { AuthService } from "@core/services/auth.service";
import { LocalStorageService } from "@core/services/local-storage.service";
import { NotificationService } from "@core/services/notification.service";
import { catchError, Observable, throwError } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const localStorageService: LocalStorageService = inject(LocalStorageService);
    const notificationService: NotificationService = inject(NotificationService);
    const authService: AuthService = inject(AuthService)
    const router = inject(Router);
    const authToken = localStorageService.getItemByKey<string>(AuthStorageKeys.Token)!;
    const isLoginRequest = req.url.includes('/auth/login');

    if (!authToken || isLoginRequest) {
        return next(req);
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        }
    })

    //TODO:
    return next(authReq).pipe(
        catchError((err) => {            
            if (err.status === 401) {
                notificationService.error('La sesión ha expirado', false)
                localStorageService.clear();
                setTimeout(() => {
                    router.navigate(['/auth/login']);
                }, 2000);
            }
            return throwError(() => err)
        })
    )
}