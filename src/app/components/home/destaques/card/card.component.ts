import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cars } from '../../../../core/models/cars.model';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() car!: Cars;
}
