import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '@prime-ng-module';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { MainButtonComponent } from './components/main-button/main-button.component';
import { MiniSpinnerComponent } from './components/mini-spinner/mini-spinner.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { LogoComponent } from './components/logo/logo.component';
import { CurrencyPipe } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress'
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [SpinnerComponent, MainButtonComponent, MiniSpinnerComponent, CardInfoComponent, LogoComponent],
    imports: [
    CommonModule,
    PrimeNgModule,
    NgCircleProgressModule.forRoot({
        radius: 159,
        outerStrokeWidth: 10,
        innerStrokeWidth: 8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration: 300,
    }),
    RouterLink
],
    exports: [
        SpinnerComponent,
        MainButtonComponent,
        MiniSpinnerComponent,
        NgCircleProgressModule,
        CardInfoComponent,
        LogoComponent,
        CurrencyPipe
    ]
})
export class SharedModule { }
