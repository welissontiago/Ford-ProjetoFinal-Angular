import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-veiculos',
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule,
    MatButtonModule,
    VehicleListComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.css',
})
export class VeiculosComponent {
  @Output() filtrosMudaram = new EventEmitter<any>();

  categoriaSelecionada: string = '';
  veiculoNome: String = '';
  combustivelSelecionado: string = '';
  statusSelecionado: string = '';

  aplicarFiltros() {
    this.filtrosMudaram.emit({
      categoria: this.categoriaSelecionada,
      nome: this.veiculoNome,
      combustivel: this.combustivelSelecionado,
      status: this.statusSelecionado,
    });
  }
}
