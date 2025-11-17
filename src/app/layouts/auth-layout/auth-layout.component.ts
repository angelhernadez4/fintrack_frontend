import { Component } from '@angular/core';

import { PrimeNgModule } from '@prime-ng-module';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SharedModule } from "@shared/shared.module";

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [PrimeNgModule, RouterOutlet, SharedModule, RouterLinkWithHref],
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.scss'
})
export default class AuthLayoutComponent {
}
