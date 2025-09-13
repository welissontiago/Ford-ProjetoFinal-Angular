import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BackgroundImageHomeComponent } from '../../components/home/background-image-home/background-image-home.component';
import { SearchFilterComponent } from '../../components/home/search-filter/search-filter.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    BackgroundImageHomeComponent,
    SearchFilterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
