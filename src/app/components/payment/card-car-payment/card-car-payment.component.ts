import { Component, Input } from '@angular/core';
import { Cars } from '../../../core/models/cars.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-car-payment',
  imports: [MatIconModule, CommonModule],
  templateUrl: './card-car-payment.component.html',
  styleUrl: './card-car-payment.component.css',
})
export class CardCarPaymentComponent {
  @Input() car!: Cars;
}
