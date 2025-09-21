import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Cars } from '../../../core/models/cars.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comprar-infos',
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './comprar-infos.component.html',
  styleUrl: './comprar-infos.component.css',
})
export class ComprarInfosComponent {
  @Input() car!: Cars;
}
