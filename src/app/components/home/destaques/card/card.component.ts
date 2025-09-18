import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cars } from '../../../../core/models/cars.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() car!: Cars;
}
