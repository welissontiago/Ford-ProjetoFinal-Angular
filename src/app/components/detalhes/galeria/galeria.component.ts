import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importe aqui
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-galeria',
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css',
})
export class GaleriaComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];

  currentIndex = 0;
  progressValue = 0;
  private autoSlide = 10000;
  private tempoSlide: any;
  private progressInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.resetAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.tempoSlide);
    clearInterval(this.progressInterval);
  }

  changeImage(index: number): void {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  nextImage(): void {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.changeImage(nextIndex);
  }

  prevImage(): void {
    const prevIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.changeImage(prevIndex);
  }

  private resetAutoSlide(): void {
    clearInterval(this.tempoSlide);
    clearInterval(this.progressInterval);
    this.progressValue = 0;

    this.tempoSlide = setInterval(() => this.nextImage(), this.autoSlide);
    this.startProgressAnimation();
  }

  private startProgressAnimation(): void {
    const startTime = Date.now();
    this.progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime / this.autoSlide) * 100;
      this.progressValue = Math.min(progress, 100);
      this.cdr.detectChanges();
    }, 50);
  }
}
