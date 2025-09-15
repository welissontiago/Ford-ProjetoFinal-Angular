import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BackgroundImageHomeComponent } from '../../components/home/background-image-home/background-image-home.component';
import { SearchFilterComponent } from '../../components/home/search-filter/search-filter.component';
import { DestaquesComponent } from '../../components/home/destaques/destaques.component';
import { CategoriasComponent } from '../../components/home/categorias/categorias.component';
import { ParceirosComponent } from '../../components/home/parceiros/parceiros.component';
import { BeneficiosComponent } from '../../components/home/beneficios/beneficios.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    BackgroundImageHomeComponent,
    SearchFilterComponent,
    DestaquesComponent,
    CategoriasComponent,
    ParceirosComponent,
    BeneficiosComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
