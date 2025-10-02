import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { Cars } from '../../../core/models/cars.model';
import { CommonModule } from '@angular/common';
import { CarsService } from '../../../core/services/cars.service';
import { PurchaseService } from '../../../core/services/purchase.service';
import { Purchase } from '../../../core/models/purchase.model';
import { forkJoin } from 'rxjs';
import { CardLastVehiclesComponent } from './card-last-vehicles/card-last-vehicles.component';

@Component({
  selector: 'app-dashboard-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    MiniCardComponent,
    CommonModule,
    CardLastVehiclesComponent,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent implements OnInit {
  @Input() car!: Cars;
  cars: Cars[] = [];
  featuredCarsCount = 0;
  totalSales = 0;
  newPurchasesCount = 0;

  constructor(
    private carsService: CarsService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    forkJoin({
      cars: this.carsService.getCars(),
      featuredCars: this.carsService.getFeaturedCars(),
      purchases: this.purchaseService.getAllPurchases(),
    }).subscribe(({ cars, featuredCars, purchases }) => {
      this.cars = cars;
      this.featuredCarsCount = featuredCars.length;
      this.calculateSales(purchases);
    });
  }

  calculateSales(purchases: Purchase[]): void {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    this.totalSales = purchases.reduce(
      (sum, purchase) => sum + purchase.car.preco,
      0
    );
    this.newPurchasesCount = purchases.filter(
      (p) => new Date(p.purchaseDate) > sevenDaysAgo
    ).length;
  }
}
