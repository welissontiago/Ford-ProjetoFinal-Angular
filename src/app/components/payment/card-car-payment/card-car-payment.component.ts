import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Cars } from '../../../core/models/cars.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Cores } from '../../../core/models/cores.model';

@Component({
  selector: 'app-card-car-payment',
  imports: [MatIconModule, CommonModule],
  templateUrl: './card-car-payment.component.html',
  styleUrl: './card-car-payment.component.css',
})
export class CardCarPaymentComponent implements OnChanges {
  @Input() car!: Cars;

  corSelecionada!: Cores;
  precoTotal: number = 0;
  imagemExibida: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['car'] && this.car) {
      if (this.car.cores && this.car.cores.length > 0) {
        this.selecionarCor(this.car.cores[0]);
      }
    }
  }

  selecionarCor(cor: Cores): void {
    this.corSelecionada = cor;
    this.imagemExibida = cor.imagem;
    this.calcularPrecoTotal();
  }

  private calcularPrecoTotal(): void {
    if (this.car && this.corSelecionada) {
      this.precoTotal = this.car.preco + this.corSelecionada.precoAdicional;
    }
  }
}
