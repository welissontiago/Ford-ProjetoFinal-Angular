import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../core/services/cars.service';
import { Cars } from '../../core/models/cars.model';
import { Cores } from '../../core/models/cores.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardCarPaymentComponent } from './card-car-payment/card-car-payment.component';
import { StepperComponent } from './stepper/stepper.component';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, CardCarPaymentComponent, StepperComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carsService = inject(CarsService);
  public car$!: Observable<Cars>;
  public corSelecionada?: Cores;

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.car$ = this.carsService.getCar(+carId);
      this.car$.subscribe(car => {
        if (car.cores && car.cores.length > 0) {
          this.corSelecionada = car.cores[0];
        }
      });
    }
  }

  onCorSelecionada(cor: Cores) {
    this.corSelecionada = cor;
  }
}