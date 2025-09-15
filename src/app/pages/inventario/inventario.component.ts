import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TitleComponent } from './title/title.component';

@Component({
  selector: 'app-inventario',
  imports: [HeaderComponent, FooterComponent, TitleComponent],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class InventarioComponent {}
