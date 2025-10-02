import { Component, ElementRef, ViewChild } from '@angular/core';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
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
