import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { OperationalComponent } from '@core/abstracts/base-operational.component';
import { OPERATIONAL_IMPORTS } from '@core/utils';
import { ProfileUpdatePasswordPageState } from '../../interfaces/profile-state.interface';
import { ProfileService } from '../../services/profile.service';
import { PROFILE_UPDATE_PASSWORD_FORM_CONTROLS_NAMES, ProfileUpdatePasswordForm } from '../../interfaces/profile-form.interface';
import { FormGroup, Validators } from '@angular/forms';
import { OperationCases } from '@core/interfaces';
import { ProfilePasswordCore } from '../../interfaces/profile.interface';
import { ResetPasswordSchema, UpdateCurrentPasswordSchema } from '@core/schemas';

@Component({
    selector: 'app-profile-update-password',
    imports: [OPERATIONAL_IMPORTS],
    templateUrl: './profile-update-password.component.html',
    styleUrl: './profile-update-password.component.scss'
})
export default class ProfileUpdatePasswordComponent extends OperationalComponent<ProfileUpdatePasswordPageState> implements OnInit, OnDestroy {
    private profileService: ProfileService = inject(ProfileService)

    public formControlNames = PROFILE_UPDATE_PASSWORD_FORM_CONTROLS_NAMES

    public form: FormGroup = this.fb.group({
        [ProfileUpdatePasswordForm.PASSWORD_CURRENT]: ['', Validators.required],
        [ProfileUpdatePasswordForm.PASSWORD]: ['', Validators.required],
        [ProfileUpdatePasswordForm.PASSWORD_CONFIRMATION]: ['', Validators.required],
    })

    public override state: WritableSignal<ProfileUpdatePasswordPageState> = signal({
        case: OperationCases.UPDATE,
        loadingSubmit: false,
        loadingData: false
    })

    ngOnInit(): void {
        this.initialize(this.profileService)
    }

    ngOnDestroy(): void {
        this.subs.forEach((s) => s.unsubscribe())
    }

    public submit() {
        if (this.isInvalidForm()) return;
        this.updateState({ loadingSubmit: true })
        const profilePassword: ProfilePasswordCore = this.form.getRawValue()
        const pf = UpdateCurrentPasswordSchema.safeParse(profilePassword)
        if (!pf.success) {
            const errors = pf.error.issues.map(err => `• ${err.message}`)            
            const errorMessage = errors.join('\n');
            this.notificationService.error(errorMessage, false)
            this.updateState({ loadingSubmit: false })
            return
        }
        this.updatePassword(pf.data)
    }

    public updatePassword(profilePassword: ProfilePasswordCore) {
        this.profileService.updatePasswordCurrent(profilePassword).subscribe((success) => {
            this.updateState({ loadingSubmit: false })
            this.handleOperationRes(success)
        })
    }
}
