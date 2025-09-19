import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionGaleriaEComprarComponent } from '../../components/detalhes/section-galeria-e-comprar/section-galeria-e-comprar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-detalhes-veiculo',
  imports: [
    CommonModule,
    SectionGaleriaEComprarComponent,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './detalhes-veiculo.component.html',
  styleUrl: './detalhes-veiculo.component.css',
})
export class DetalhesVeiculoComponent {}
