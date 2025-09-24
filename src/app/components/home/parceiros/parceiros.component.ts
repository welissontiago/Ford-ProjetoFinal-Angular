import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  inject,
  effect,
} from '@angular/core';
import { gsap } from 'gsap';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-parceiros',
  standalone: true,
  imports: [],
  templateUrl: './parceiros.component.html',
  styleUrls: ['./parceiros.component.css'],
})
export class ParceirosComponent implements AfterViewInit, OnDestroy {
  public themeService = inject(ThemeService);
  private brandsColumnsContainer!: HTMLElement;
  private activeTimelines: gsap.core.Timeline[] = [];
  private mediaMatcher = window.matchMedia('(max-width: 700px)');

  private animationStyles = [
    { from: { y: '100%' }, to: { y: '-100%' } },
    { from: { x: '-100%' }, to: { x: '100%' } },
    { from: { y: '-100%' }, to: { y: '100%' } },
    { from: { x: '100%' }, to: { x: '-100%' } },
  ];

  constructor(private el: ElementRef, private zone: NgZone) {
    effect(() => {
      this.themeService.currentTheme();
      setTimeout(() => this.setupAnimations(), 0);
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.brandsColumnsContainer =
        this.el.nativeElement.querySelector('.brands-columns');
      if (this.brandsColumnsContainer) {
        this.setupAnimations();
        this.mediaMatcher.addEventListener('change', this.setupAnimations);
      }
    });
  }

  ngOnDestroy(): void {
    this.mediaMatcher.removeEventListener('change', this.setupAnimations);
    this.activeTimelines.forEach((tl) => tl.kill());
  }

  private setupAnimations = (): void => {
    if (!this.brandsColumnsContainer) return;

    this.activeTimelines.forEach((tl) => tl.kill());
    this.activeTimelines = [];

    const allColumns: NodeListOf<HTMLElement> =
      this.brandsColumnsContainer.querySelectorAll('.brand-column');

    if (this.mediaMatcher.matches && allColumns.length === 3) {
      allColumns.forEach((col) => (col.style.display = ''));

      const logosToMove = allColumns[2].querySelectorAll('.logo');
      logosToMove.forEach((logo, index) => {
        const targetColumnIndex = index % 2;
        allColumns[targetColumnIndex]
          .querySelector('.logo-slot')
          ?.appendChild(logo);
      });
      allColumns[2].style.display = 'none';
    } else {
      allColumns.forEach((c) => (c.style.display = ''));
    }

    const visibleColumns = Array.from(allColumns).filter((column) => {
      return window.getComputedStyle(column).display !== 'none';
    });

    visibleColumns.forEach((column, i) => {
      const logos = column.querySelectorAll('.logo');
      const currentAnimation =
        this.animationStyles[i % this.animationStyles.length];

      const tl = gsap.timeline({
        repeat: -1,
        delay: i * 0.5,
      });

      this.activeTimelines.push(tl);

      logos.forEach((logo) => {
        tl.set(logo, { ...currentAnimation.from, autoAlpha: 0 })
          .to(logo, {
            x: '0%',
            y: '0%',
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power2.out',
          })
          .to(
            logo,
            {
              ...currentAnimation.to,
              autoAlpha: 0,
              duration: 0.8,
              ease: 'power2.in',
            },
            '+=3'
          );
      });
    });
  };
}
