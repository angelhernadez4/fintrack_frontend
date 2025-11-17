import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { ActivatedRoute, Router } from "@angular/router"

import { PrimeNgModule } from '@prime-ng-module';
import { SharedModule } from "@shared/shared.module";
import { ResendNewToken } from '@core/interfaces';

@Component({
    selector: 'app-confirm-account',
    imports: [PrimeNgModule, ReactiveFormsModule, FormsModule, SharedModule],
    templateUrl: './confirm-account.component.html',
    standalone: true,
    styleUrl: './confirm-account.component.scss'
})
export default class ConfirmAccountComponent implements OnInit {
    private readonly authService: AuthService = inject(AuthService);
    private readonly notificationService: NotificationService = inject(NotificationService)
    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly router: Router = inject(Router);
    private route = inject(ActivatedRoute)
    public loading: WritableSignal<boolean> = signal(false);
    public timeLeft: WritableSignal<string> = signal('10:00')
    public resendDisabled: WritableSignal<boolean> = signal(true)
    public email: WritableSignal<string> = signal('')
    public form: FormGroup = this.fb.group({
        token: ['', [Validators.required, Validators.minLength(6)]]
    })
    private intervalId: any

    ngOnInit(): void {
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

    public validateToken() {
        if (this.form.invalid) return

        this.loading.set(true)

        const token = this.form.getRawValue()
        
        this.authService.confirmAccount(token).subscribe((success) => {
            this.loading.set(false)

            if (!success) return

            this.notificationService.success("Cuenta confirmada correctamente")

            this.router.navigateByUrl('/auth/login')
        })
    }

    public resendNewToken() {
        const newToken : ResendNewToken = {
            email: this.email(),
            type: 'confirmation'
        }
        this.authService.resendToken(newToken).subscribe((success) => {
            if (!success) return
            this.notificationService.success('Codigo reenviado', false)

            clearInterval(this.intervalId)
            this.startTimer(10 * 60)
        })
    }
}
