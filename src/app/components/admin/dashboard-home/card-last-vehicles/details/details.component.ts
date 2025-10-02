import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { MatIconModule } from '@angular/material/icon';
import { Cars } from '../../../../../core/models/cars.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [MatButtonModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input() vehicle!: Cars;
  @Output() deleteRequested = new EventEmitter<number | string>();

  onDelete(): void {
    this.deleteRequested.emit(this.vehicle.id);
  }
}
