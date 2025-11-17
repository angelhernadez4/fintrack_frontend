import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api'
import { FacebookLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login'
import { authInterceptor } from '@core/interceptor/auth.interceptor';
import { routes } from './app.routes';
import MyPreset from './mypreset';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withViewTransitions({ skipInitialTransition: true })),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([authInterceptor])),
        ConfirmationService,
        MessageService,
        providePrimeNG({
            theme: {
                preset: MyPreset,
            }
        }),
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                lang: 'en',
                providers: [
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('clientId')
                    }
                ],
                onError: (err: any) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        }
    ]
};
