import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-card-info',
    standalone: false,
    templateUrl: './card-info.component.html',
    styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {
    public onClick = output<{event: Event; data: any}>()

    public titleKey = input<string>('')
    public subtitleKey = input<string>('')
    public amount = input<number>(0)
    public detailRoute = input<string>('')
    public id = input<string>('')
    public data = input<any>();
    
    public click(event: Event) {
        this.onClick.emit({ event, data: this.data() })
    }

    get shortenedTitle(): string {
        const words = this.titleKey().split(' ');
        return words.length > 4 ? words.slice(0, 4).join(' ') + '...' : this.titleKey();
    }

}
