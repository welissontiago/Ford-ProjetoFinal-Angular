import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { MatIconModule } from '@angular/material/icon';
import { Cars } from '../../../../../core/models/cars.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input() vehicle!: Cars;

  @ViewChild('dotlottieCanvas') dotlottieCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    new DotLottie({
      autoplay: true,
      loop: true,
      canvas: this.dotlottieCanvas.nativeElement,
      src: 'https://lottie.host/96e35001-d3e6-438a-bae4-5d3d1d3eea64/gjn8a6msFR.lottie',
    });
  }
}
