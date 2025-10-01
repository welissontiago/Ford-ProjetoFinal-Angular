import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { Cars } from '../../../core/models/cars.model';
import { CommonModule } from '@angular/common';
import { CarsService } from '../../../core/services/cars.service';

@Component({
  selector: 'app-dashboard-home',
  imports: [MatButtonModule, MatIconModule, MiniCardComponent, CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent implements OnInit {
  @Input() car!: Cars;
  cars: Cars[] = [];

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }
}
