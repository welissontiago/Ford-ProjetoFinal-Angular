import { Component, Input } from '@angular/core';
import { Cars } from '../../../core/models/cars.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CardEspecificacoesComponent } from './card-especificacoes/card-especificacoes.component';
import { CardEquipamentosComponent } from './card-equipamentos/card-equipamentos.component';

@Component({
  selector: 'app-tabs-detalhe',
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    CardEspecificacoesComponent,
    CardEquipamentosComponent,
  ],
  templateUrl: './tabs-detalhe.component.html',
  styleUrl: './tabs-detalhe.component.css',
})
export class TabsDetalheComponent {
  @Input() car!: Cars;
}
