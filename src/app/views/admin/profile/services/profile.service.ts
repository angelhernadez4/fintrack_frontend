import { inject, Injectable } from '@angular/core';
import { BaseService } from '@core/abstracts/base.service';
import { ErrorsMap, GenericBackendResponse, GetOneObs, SuccessObs } from '@core/interfaces';
import { CATALOG_ENDPOINTS } from '@views/admin/utils/api-endpoints';
import { catchError, map, of } from 'rxjs';
import { Profile, ProfileCore, ProfilePasswordCore } from '../interfaces/profile.interface';
import { NotificationService } from '@core/services/notification.service';
import { ResetPasswordSchema } from '@core/schemas';

@Injectable({ providedIn: 'root'})
export class ProfileService extends BaseService {
    private readonly notificationService: NotificationService = inject(NotificationService)

    constructor() {
        super({
            baseRoute: '',
            baseEndpoint: CATALOG_ENDPOINTS.profile,
            singularName: 'Perfil',
            fatherRoute: '/admin/profile/detail/'
        })
    }

    public getUserById(userId: string) : GetOneObs<Profile> {
        const url: string = `${this.base_url}`
        return this.http.get<{success: boolean, user: Profile}>(url).pipe(
            map((res) => (!res.user ? ErrorsMap.ELEMENT_NOT_EXIST : res.user)),
            catchError(() => of(null))
        )
    }

    public updateProfile(userId: string, profile: ProfileCore) : SuccessObs {
        const url: string = `${this.base_url}/${userId}`
        return this.http.patch<GenericBackendResponse>(url, profile).pipe(
            map((res) => res.success),
            catchError((err) => {
                if(!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
               return of(false)
            })
        )
    }

    public updatePasswordCurrent(profilePassword: ProfilePasswordCore) {
        const url: string = `${this.base_url}/update-current-password`
        return this.http.post<GenericBackendResponse>(url, profilePassword).pipe(
            map((res) => res.success),
            catchError((err) => {
                if (!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }

    public checkPassword(password: string): SuccessObs {
        // const url: string = `${this.base_url}/check-password`
        const url: string = `${this.base_url}/check-password`
        return this.http.post<GenericBackendResponse>(url, password).pipe(
            map((res) => res.success),
            catchError((err) => {
                if (!err.error.success) {
                    this.notificationService.error(err.error.message, false)
                }
                return of(false)
            })
        )
    }
}
