import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TitleComponent } from './title/title.component';
import { PesquisaComponent } from '../../components/inventario/pesquisa/pesquisa.component';

@Component({
  selector: 'app-inventario',
  imports: [
    HeaderComponent,
    FooterComponent,
    TitleComponent,
    PesquisaComponent,
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class InventarioComponent {}
