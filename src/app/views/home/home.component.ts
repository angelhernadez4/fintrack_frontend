import { Component } from '@angular/core';
import { PrimeNgModule } from '@prime-ng-module';
import { SharedModule } from "@shared/shared.module";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [PrimeNgModule, SharedModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
