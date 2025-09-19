import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionGaleriaEComprarComponent } from '../../components/detalhes/section-galeria-e-comprar/section-galeria-e-comprar.component';

@Component({
  selector: 'app-detalhes-veiculo',
  imports: [CommonModule, SectionGaleriaEComprarComponent],
  templateUrl: './detalhes-veiculo.component.html',
  styleUrl: './detalhes-veiculo.component.css',
})
export class DetalhesVeiculoComponent {}
