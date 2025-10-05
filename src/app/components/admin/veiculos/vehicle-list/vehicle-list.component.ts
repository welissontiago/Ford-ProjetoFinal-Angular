import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Cars } from '../../../../core/models/cars.model';
import { CarsService } from '../../../../core/services/cars.service';
import { forkJoin, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  imports: [
    MatDividerModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css',
})
export class VehicleListComponent implements OnInit {
  @Input() car!: Cars;
  cars: Cars[] = [];
  featuredCarsCount = 0;
  public AllVehicles$!: Observable<Cars[]>;
  public deletedCars$!: Observable<Cars>;

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    forkJoin({
      cars: this.carsService.getCars(),
      featuredCars: this.carsService.getFeaturedCars(),
    }).subscribe(({ cars, featuredCars }) => {
      this.cars = cars;
      this.featuredCarsCount = featuredCars.length;
    });
  }

  deleteCar(id: number | string): void {
    this.carsService.deleteCar(id).subscribe({
      next: () => {
        console.log(`Carro ${id} deletado com sucesso!`);
        this.AllVehicles$ = this.carsService.getCars();
      },
      error: (err) => {
        console.error('Erro ao deletar carro:', err);
      },
    });
  }
}
