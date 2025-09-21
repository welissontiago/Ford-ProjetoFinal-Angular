import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../core/services/cars.service';
import { Cars } from '../../core/models/cars.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardCarPaymentComponent } from './card-car-payment/card-car-payment.component';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, CardCarPaymentComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carsService = inject(CarsService);
  public car$!: Observable<Cars>;

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.car$ = this.carsService.getCar(+carId);
    }
  }
}
