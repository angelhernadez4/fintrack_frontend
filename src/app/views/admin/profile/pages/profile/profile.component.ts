import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { OperationalComponent } from '@core/abstracts/base-operational.component';
import { OPERATIONAL_IMPORTS } from '@core/utils';
import { ProfilePageState } from '../../interfaces/profile-state.interface';
import { ProfileService } from '../../services/profile.service';
import { PROFILE_FORM_CONTROLS_NAMES, ProfileForm } from '../../interfaces/profile-form.interface';
import { FormGroup, Validators } from '@angular/forms';
import { OperationCases } from '@core/interfaces';
import { ProfileCore } from '../../interfaces/profile.interface';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-profile',
    imports: [OPERATIONAL_IMPORTS],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export default class ProfileComponent extends OperationalComponent<ProfilePageState> implements OnInit, OnDestroy {
    private profileService: ProfileService = inject(ProfileService)
    private authService: AuthService = inject(AuthService)

    public userId: WritableSignal<string> = signal('')
    public formControlNames = PROFILE_FORM_CONTROLS_NAMES
    public form: FormGroup = this.fb.group({
        [ProfileForm.NAME]: ['', Validators.required],
        [ProfileForm.LAST_NAME]: ['', Validators.required],
        [ProfileForm.EMAIL]: ['', Validators.required],
    })

    public override state: WritableSignal<ProfilePageState> = signal({
        case: OperationCases.UPDATE,
        loadingData: false,
        loadingSubmit: false
    })

    ngOnInit(): void {
        this.initialize(this.profileService)
        this.updateState({ loadingData: true })
        this.setCase((_id) => this.getUser(_id))
    }

    ngOnDestroy(): void {
        this.subs.forEach((s) => s.unsubscribe())
    }

    public submit() {
        if (this.isInvalidForm()) return;
        this.updateState({ loadingSubmit: true })
        const profile: ProfileCore = this.form.getRawValue()
        this.updateProfile(profile)
    }

    private updateProfile(profile: ProfileCore) {
        this.profileService.updateProfile(this.userId(), profile).subscribe((success) => {
            this.updateState({ loadingSubmit: false })
            if (success) {
                this.authService.updateLocalUser(profile);
                this.handleOperationRes(success)
            }
        })
    }

    private getUser(_id: string) {
        this.userId.set(_id)
        this.profileService.getUserById(_id).subscribe((user) => {
            if (this.hasGetError(user)) return
            this.form.reset(user)
            this.updateState({ loadingData: false })
        })
    }
}
