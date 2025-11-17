import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

import { PrimeNgModule } from '@prime-ng-module';
import { SharedModule } from "@shared/shared.module";
@Component({
    selector: 'app-admin-layout',
    imports: [PrimeNgModule, RouterOutlet, SharedModule, RouterLinkWithHref, RouterLinkActive],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss'
})
export default class AdminLayoutComponent implements OnInit {
    private readonly authService: AuthService = inject(AuthService)
    public date: WritableSignal<number> = signal(0)
    public email: WritableSignal<string> = signal('angel.lphernandez@gmail.com')

    ngOnInit(): void {
        this.date.set(new Date().getFullYear())
    }

    public closeSession() {
        this.authService.logout();
    }
}
