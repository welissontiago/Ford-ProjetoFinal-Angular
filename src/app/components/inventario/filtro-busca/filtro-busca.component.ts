import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtro-busca',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, CommonModule],
  templateUrl: './filtro-busca.component.html',
  styleUrls: ['./filtro-busca.component.css'],
})
export class FiltroBuscaComponent {
  @Output() filtrosMudaram = new EventEmitter<any>();

  categoriaSelecionada: string = '';
  anoSelecionado: number | null = null;
  combustivelSelecionado: string = '';
  faixaPrecoSelecionada: string = '';

  aplicarFiltros() {
    this.filtrosMudaram.emit({
      categoria: this.categoriaSelecionada,
      ano: this.anoSelecionado,
      combustivel: this.combustivelSelecionado,
      preco: this.faixaPrecoSelecionada,
    });
  }
}
