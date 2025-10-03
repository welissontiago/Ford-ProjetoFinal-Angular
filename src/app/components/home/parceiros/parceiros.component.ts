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
  private changeListener: () => void;

  private animationStyles = [
    { from: { y: '100%' }, to: { y: '-100%' } },
    { from: { x: '-100%' }, to: { x: '100%' } },
    { from: { y: '-100%' }, to: { y: '100%' } },
    { from: { x: '100%' }, to: { x: '-100%' } },
  ];

  constructor(private el: ElementRef, private zone: NgZone) {
    this.changeListener = () =>
      this.zone.runOutsideAngular(this.setupAnimations);

    effect(() => {
      this.themeService.currentTheme();
      setTimeout(() => this.zone.runOutsideAngular(this.setupAnimations), 0);
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.brandsColumnsContainer =
        this.el.nativeElement.querySelector('.brands-columns');
      if (this.brandsColumnsContainer) {
        this.setupAnimations();
        this.mediaMatcher.addEventListener('change', this.changeListener);
      }
    });
  }

  ngOnDestroy(): void {
    this.mediaMatcher.removeEventListener('change', this.changeListener);
    this.activeTimelines.forEach((tl) => tl.kill());
  }

  private setupAnimations = (): void => {
    if (!this.brandsColumnsContainer) return;

    // mata animações antigas
    this.activeTimelines.forEach((tl) => tl.kill());
    this.activeTimelines = [];

    const allColumns: NodeListOf<HTMLElement> =
      this.brandsColumnsContainer.querySelectorAll('.brand-column');

    // pega só colunas realmente visíveis (display !== none via CSS)
    const visibleColumns = Array.from(allColumns).filter(
      (column) => column.offsetParent !== null
    );

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
