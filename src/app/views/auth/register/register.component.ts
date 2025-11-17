import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@core/services/auth.service';
import { Register } from '@core/interfaces/auth.interfaces';
import { RegisterSchema } from '@core/schemas';

import { PrimeNgModule } from '@prime-ng-module';
import { NotificationService } from '@core/services/notification.service';
import { SharedModule } from "@shared/shared.module";

@Component({
    selector: 'app-register',
    imports: [RouterLink, PrimeNgModule, ReactiveFormsModule, SharedModule],
    templateUrl: './register.component.html',
    standalone: true,
    styleUrl: './register.component.scss'
})
export default class RegisterComponent {
    private readonly authService: AuthService = inject(AuthService);
    private readonly notificationService: NotificationService = inject(NotificationService)

    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly router: Router = inject(Router);

    public form: FormGroup = this.fb.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
    })

    public loading: WritableSignal<boolean> = signal(false);

    public register() {
        if (this.form.invalid) return

        this.loading.set(true)
        const user = this.form.getRawValue() as Register

        const register = RegisterSchema.safeParse(user)

        if (!register.success) {
            const errors = register.error.issues.map(err => `• ${err.message}`);

            const errorMessage = errors.join('\n');

            this.notificationService.error(errorMessage, false)
            this.loading.set(false)
            return
        }
        
        this.authService.register(register.data).subscribe((success) => {
            this.loading.set(false)

            if (!success) return
            this.notificationService.success('Revisa tu correo electrónico para seguir instrucciones.', false)
            this.form.reset()
        })
    }
}
