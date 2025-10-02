import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-card-last-vehicles',
  imports: [MatIconModule, DetailsComponent],
  templateUrl: './card-last-vehicles.component.html',
  styleUrl: './card-last-vehicles.component.css',
})
export class CardLastVehiclesComponent {}
