import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.lastVehicles$ = this.carsService.getLastVehicles();
  }
}
