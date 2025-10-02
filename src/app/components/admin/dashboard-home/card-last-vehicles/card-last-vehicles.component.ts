import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './details/details.component';
import { CarsService } from '../../../../core/services/cars.service';
import { Observable } from 'rxjs';
import { Cars } from '../../../../core/models/cars.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-last-vehicles',
  imports: [MatIconModule, DetailsComponent, CommonModule],
  templateUrl: './card-last-vehicles.component.html',
  styleUrl: './card-last-vehicles.component.css',
})
export class CardLastVehiclesComponent implements OnInit {
  private carsService = inject(CarsService);
  public lastVehicles$!: Observable<Cars[]>;
  @Input() vehicle!: Cars;
  public deletedCars$!: Observable<Cars>;

  ngOnInit(): void {
    this.lastVehicles$ = this.carsService.getLastVehicles();
  }

  deleteCar(id: number | string): void {
    this.carsService.deleteCar(id).subscribe({
      next: () => {
        console.log(`Carro ${id} deletado com sucesso!`);
        this.lastVehicles$ = this.carsService.getLastVehicles();
      },
      error: (err) => {
        console.error('Erro ao deletar carro:', err);
      },
    });
  }
}
