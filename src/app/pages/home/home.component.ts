import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BackgroundImageHomeComponent } from '../../components/home/background-image-home/background-image-home.component';
import { SearchFilterComponent } from '../../components/home/search-filter/search-filter.component';
import { DestaquesComponent } from '../../components/home/destaques/destaques.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    BackgroundImageHomeComponent,
    SearchFilterComponent,
    DestaquesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
