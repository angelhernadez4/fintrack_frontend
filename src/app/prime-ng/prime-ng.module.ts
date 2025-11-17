import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast'
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { InputNumberModule } from 'primeng/inputnumber';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AvatarModule } from 'primeng/avatar';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToastModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        FloatLabelModule,
        ButtonModule,
        DividerModule,
        InputOtpModule,
        PasswordModule,
        ToolbarModule,
        CardModule,
        PaginatorModule,
        InputNumberModule,
        TieredMenuModule,
        Popover,
        PopoverModule,
        DialogModule,
        SkeletonModule,
        ConfirmDialogModule,
        AvatarModule,
        AnimateOnScrollModule                   
    ],
    exports: [
        ToastModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        FloatLabelModule,
        ButtonModule,
        DividerModule,
        InputOtpModule,
        PasswordModule,
        ToolbarModule,
        CardModule,
        PaginatorModule,
        InputNumberModule,       
        TieredMenuModule,
        Popover,        
        PopoverModule,
        DialogModule,
        SkeletonModule,
        ConfirmDialogModule,
        AvatarModule,
        AnimateOnScrollModule                   
    ]
})
export class PrimeNgModule { }
