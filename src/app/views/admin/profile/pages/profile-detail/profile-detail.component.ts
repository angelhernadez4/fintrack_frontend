import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { DETAIL_IMPORTS } from '@core/utils';

@Component({
    selector: 'app-profile-detail',
    imports: [DETAIL_IMPORTS],
    standalone: true,
    templateUrl: './profile-detail.component.html',
    styleUrl: './profile-detail.component.scss'
})
export default class ProfileDetailComponent implements OnInit{
    private authService: AuthService = inject(AuthService)

    public initials: WritableSignal<string> = signal('')
    public fullName: WritableSignal<string> = signal('')
    public email: WritableSignal<string> = signal('')
    public _id: WritableSignal<string> = signal('')

    ngOnInit(): void {
        this.getDataUser()
    }

    public getDataUser() {
        const name = this.authService.getUser()?.name ?? ''
        const lastName = this.authService.getUser()?.lastName ?? ''
        const email = this.authService.getUser()?.email ?? ''
        const id = this.authService.getUser()?._id ?? ''
        const initialsValue = `${name.charAt(0)}${lastName.charAt(0)}`.toLocaleUpperCase()
        this._id.set(id)
        this.fullName.set(`${name}${' '}${lastName}`)
        this.initials.set(initialsValue)
        this.email.set(email)
    }
}
