import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ResendNewToken } from '@core/interfaces';
import { ResetPasswordSchema } from '@core/schemas';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

import { PrimeNgModule } from '@prime-ng-module';
import { SharedModule } from "@shared/shared.module";

@Component({
    selector: 'app-new-password',
    imports: [PrimeNgModule, ReactiveFormsModule, SharedModule],
    standalone: true,
    templateUrl: './new-password.component.html',
    styleUrl: './new-password.component.scss'
})
export default class NewPasswordComponent implements OnInit{
    private readonly authService: AuthService = inject(AuthService);
    private readonly notificationService: NotificationService = inject(NotificationService)
    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly router: Router = inject(Router);
    private route = inject(ActivatedRoute)

    public isValidToken: WritableSignal<boolean> = signal(false);
    public token: WritableSignal<string> = signal('');
    public loadingToken: WritableSignal<boolean> = signal(false);
    public loadingResetPassword: WritableSignal<boolean> = signal(false);
    public resendDisabled: WritableSignal<boolean> = signal(true)
    public timeLeft: WritableSignal<string> = signal('10:00')
    public email: WritableSignal<string> = signal('')
    private intervalId: any

    ngOnInit() {
        const emailParam = this.route.snapshot.queryParamMap.get('email')
        if (emailParam) this.email.set(emailParam)
        this.startTimer(10 * 60)
    }

    private startTimer(seconds: number) {
        this.resendDisabled.set(true)

        let remaining = seconds

        this.intervalId = setInterval(() => {
            const minutes = Math.floor(remaining / 60)
            const secs = remaining % 60

            this.timeLeft.set(`${minutes}:${secs.toString().padStart(2, '0')}`)
            
            remaining--;

            if (remaining < 0) {
                clearInterval(this.intervalId)
                this.resendDisabled.set(false)
            }
        }, 1000)
    }

    public formToken: FormGroup = this.fb.group({
        token: ['', [Validators.required, Validators.minLength(6)]]
    })

    public formNewPassword: FormGroup = this.fb.group({
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
    })

    public validateToken() {
        if (this.formToken.invalid) return

        this.loadingToken.set(true)

        const token = this.formToken.getRawValue()
        this.token.set(token.token)

        this.authService.validateToken(token).subscribe((success) => {
            this.loadingToken.set(false)

            if (!success) return

            this.notificationService.success("Token válido, asigna una nueva contraseña", false)
            this.isValidToken.set(true)
        })
    }

    public resendNewToken() {
        const newToken : ResendNewToken = {
            email: this.email(),
            type: 'update'
        }
        this.authService.resendToken(newToken).subscribe(() => {
            this.notificationService.success('Codigo reenviado', false)

            clearInterval(this.intervalId)
            this.startTimer(10 * 60)
        })
    }

    public resetPassword() {
        if (this.formNewPassword.invalid) return

        this.loadingResetPassword.set(true)

        const passwordUser = this.formNewPassword.getRawValue()

        const password = ResetPasswordSchema.safeParse(passwordUser)

        if (!password.success) {
            const errors = password.error.issues.map(err => `• ${err.message}`)
            const errorMessage = errors.join('\n');

            this.notificationService.error(errorMessage, false)
            this.loadingResetPassword.set(false)
            return
        }        

        this.authService.resetPassword(password.data, this.token()).subscribe((success) => {
            this.loadingResetPassword.set(false)

            if (!success) return

            this.notificationService.success('La contraseña de actualizo correctamente.', false)
            this.formNewPassword.reset()
            this.router.navigateByUrl('/auth/login')
        })
    }
}
