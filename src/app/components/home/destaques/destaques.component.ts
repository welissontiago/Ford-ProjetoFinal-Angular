import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { CarsService } from '../../../core/services/cars.service';
import { Cars } from '../../../core/models/cars.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-destaques',
  imports: [CardComponent, CommonModule],
  templateUrl: './destaques.component.html',
  styleUrl: './destaques.component.css',
})
export class DestaquesComponent {
  private carsService = inject(CarsService);
  public featuredCars$!: Observable<Cars[]>;

  ngOnInit(): void {
    this.featuredCars$ = this.carsService.getFeaturedCars();
  }
}
