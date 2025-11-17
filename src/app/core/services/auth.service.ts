import { inject, Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environments';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse, Register, SuccessObs, User, AuthStorageKeys, ResendNewToken, PasswordCore } from '@core/interfaces';
import { catchError, map, of, tap } from 'rxjs';
import { NotificationService } from '@core/services/notification.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly BASE_URL: string = `${ENV.api.url}/auth`;
    private readonly http: HttpClient = inject(HttpClient);
    private readonly notificationService: NotificationService = inject(NotificationService)
    private readonly localStorageService: LocalStorageService = inject(LocalStorageService)
    private readonly router: Router = inject(Router);

    constructor() { }

    public login(userReq: Login) : SuccessObs {
        const url: string = `${this.BASE_URL}/login`;
        return this.http.post<LoginResponse>(url, userReq).pipe(
            tap((res) => {
                const { access_token, user } = res                
                this.setUser(user, access_token)             
            }),
            map(() => true),
            catchError((err) => {
                if (!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }

    public register(userReq: Register) : SuccessObs {
        const url: string = `${this.BASE_URL}/signup`;
        return this.http.post(url, userReq).pipe(
            map(() => true),
            catchError((err) => {
                if (!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }

    public confirmAccount(token: string): SuccessObs {
        const url: string = `${this.BASE_URL}/confirm-account`
        return this.http.post(url, token).pipe(
            map(() => true),
            catchError((err) => { 
                if (!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }

    public forgotPassword(email: string): SuccessObs {
        const url: string = `${this.BASE_URL}/forgot-password`
        return this.http.post(url, {email}).pipe(
            map(() => true),
            catchError((err) => {
                if (!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }

    public validateToken(token: string) {
        const url: string = `${this.BASE_URL}/validate-token`

        return this.http.post(url, token).pipe(
            map(() => true),
            catchError((err) => {
                if (!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }

    public resetPassword(passwordCore: PasswordCore, token: string) {
        const url: string = `${this.BASE_URL}/update-password/${token}`

        return this.http.post(url, passwordCore).pipe(
            map(() => true),
            catchError((err) => {
                if (!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }

    public resendToken(resendNewTokenCore: ResendNewToken) : SuccessObs {
        const url: string = `${this.BASE_URL}/request-token`
        return this.http.post(url, resendNewTokenCore).pipe(
            map(() => true),
            catchError((err) => {                
                if (err.error.message) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }

    private setUser(user: User, token: string) {
        this.localStorageService.saveItem(AuthStorageKeys.User, user)
        this.localStorageService.saveItem(AuthStorageKeys.Token, token)
    }

    public updateLocalUser(userData: Partial<User>) {
        const currentUser = this.getUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...userData };
            this.localStorageService.saveItem(AuthStorageKeys.User, updatedUser);
        }
    }


    public getToken() {
        return this.localStorageService.getItemByKey<string>(AuthStorageKeys.Token)
    }

    public getUser() {
        return this.localStorageService.getItemByKey<User>(AuthStorageKeys.User)
    }

    public isLoggedIn(): boolean {
        const token = this.getToken();
        const user = this.getUser();

        if (token && user) return true;

        return false
    }

    public redirectToLogin() {
        this.router.navigate(['/auth/login'])
    }

    public redirectToHome() {
        this.router.navigateByUrl('/admin')
    }

    public logout() {
        this.localStorageService.clear()
        this.redirectToLogin();
    }
}
