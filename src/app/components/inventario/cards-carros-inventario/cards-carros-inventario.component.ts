import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cars } from '../../../core/models/cars.model';

@Component({
  selector: 'app-cards-carros-inventario',
  imports: [CommonModule],
  templateUrl: './cards-carros-inventario.component.html',
  styleUrl: './cards-carros-inventario.component.css',
})
export class CardsCarrosInventarioComponent {
  @Input() car!: Cars;
}
