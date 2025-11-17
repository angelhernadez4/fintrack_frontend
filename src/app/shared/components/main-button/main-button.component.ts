import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-main-button',
    standalone: false,
    styleUrl: './main-button.component.scss',
    templateUrl: './main-button.component.html',
})
export  class MainButtonComponent {
    public onClick = output();

    public loading = input.required<boolean>();

    public icon = input<string>('');
    public label = input<string>('Enviar');
    public disabled = input<boolean>(false)
    public severity = input<
        | 'success'
        | 'info'
        | 'danger'
        | 'help'
        | 'primary'
        | 'secondary'
        | 'contrast'
        | null
        | undefined
    >('primary');

    public click() {
        this.onClick.emit()
    }
}
