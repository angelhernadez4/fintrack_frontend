import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { ForgotPasswordSchema } from '@core/schemas';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

import { PrimeNgModule } from '@prime-ng-module';
import { SharedModule } from "@shared/shared.module";


@Component({
    selector: 'app-forgot-password',
    imports: [RouterLink, PrimeNgModule, ReactiveFormsModule, SharedModule],
    standalone: true,
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export default class ForgotPasswordComponent {
    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly notificationService: NotificationService = inject(NotificationService)
    private readonly authService: AuthService = inject(AuthService);

    public form: FormGroup = this.fb.group({
        email: ['', Validators.required]
    })

    public loading: WritableSignal<boolean> = signal(false);

    public sendInstructions() {
        if (this.form.invalid) return

        this.loading.set(true)

        const emailForm = this.form.getRawValue()

        const email = ForgotPasswordSchema.safeParse(emailForm)
        
        if (!email.success) {
            const errors = email.error.issues.map(err => `• ${err.message}`);
            const errorMessage = errors.join('\n');

            this.notificationService.error(errorMessage, false)
            this.loading.set(false)
            return
        }

        this.authService.forgotPassword(email.data.email).subscribe((success) => {
            this.loading.set(false)

            if (!success) return

            this.notificationService.success('Revisa tu correo electrónico para seguir instrucciones.', false)
            this.form.reset()
        })
    }
}
