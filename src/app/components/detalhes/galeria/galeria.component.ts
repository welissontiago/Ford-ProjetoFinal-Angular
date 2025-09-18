import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
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
  imports: [CommonModule, MatIconModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css',
})
export class GaleriaComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() images: string[] = [];

  currentIndex = 0;
  private autoSlide = 10000;
  private tempoSlide: any;
  private progressao: HTMLElement | null = null;
  private readonly radius = 15.9155;
  private readonly circunferencia = 2 * Math.PI * this.radius;
  strokeDashoffset = this.circunferencia;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.resetAutoSlide();
  }

  ngAfterViewInit(): void {
    this.progressao = document.getElementById('progress-circle');
    this.startProgressAnimation();
  }

  ngOnDestroy(): void {
    clearInterval(this.tempoSlide);
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
    this.tempoSlide = setInterval(() => this.nextImage(), this.autoSlide);
    this.startProgressAnimation();
  }

  private startProgressAnimation(): void {
    if (this.progressao) {
      this.progressao.style.transition = 'none';
      this.strokeDashoffset = this.circunferencia;
      this.cdr.detectChanges();

      setTimeout(() => {
        if (this.progressao) {
          this.progressao.style.transition = `stroke-dashoffset ${
            this.autoSlide / 1000
          }s linear`;
          this.strokeDashoffset = 0;
          this.cdr.detectChanges();
        }
      }, 50);
    }
  }
}
