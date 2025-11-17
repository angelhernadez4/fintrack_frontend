import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PrimeNgModule } from '@prime-ng-module';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@core/services/auth.service';
import { Login } from '@core/interfaces';
import { NotificationService } from '@core/services/notification.service';
import { SharedModule } from "@shared/shared.module";
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
    selector: 'app-login',
    imports: [PrimeNgModule, ReactiveFormsModule, RouterLink, SharedModule],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export default class LoginComponent {
    private readonly authService: AuthService = inject(AuthService);
    private readonly notificationService: NotificationService = inject(NotificationService);
    // private readonly socialAuthService: SocialAuthService = inject(SocialAuthService)

    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly router: Router = inject(Router);

    public loading: WritableSignal<boolean> = signal(false);
    // public user?: WritableSignal<SocialUser>

    public form: FormGroup = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })
    public login() {
        if (this.form.invalid) return;
        this.loading.set(true);

        const user = this.form.getRawValue() as Login
        this.authService.login(user).subscribe((success) => {
            if (!success) {
                this.loading.set(false);
                return
            }
            this.loading.set(false);
            this.router.navigateByUrl('admin');
            this.form.reset()
        })
    }

    public fLogin() {
        // this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    }
}


