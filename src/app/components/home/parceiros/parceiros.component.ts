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
  
  // Variável para guardar o HTML original das colunas
  private originalContainerHTML: string = ''; 
  private changeListener: () => void;

  private animationStyles = [
    { from: { y: '100%' }, to: { y: '-100%' } },
    { from: { x: '-100%' }, to: { x: '100%' } },
    { from: { y: '-100%' }, to: { y: '100%' } },
    { from: { x: '100%' }, to: { x: '-100%' } },
  ];

  constructor(private el: ElementRef, private zone: NgZone) {
    // A função de setup agora é envolvida pelo NgZone para melhor performance
    this.changeListener = () => this.zone.runOutsideAngular(this.setupAnimations);

    effect(() => {
      this.themeService.currentTheme();
      // O setTimeout garante que o HTML seja atualizado pelo Angular antes de a animação ser recalculada
      setTimeout(() => this.zone.runOutsideAngular(this.setupAnimations), 0);
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.brandsColumnsContainer =
        this.el.nativeElement.querySelector('.brands-columns');
      if (this.brandsColumnsContainer) {
        // **PASSO 1: Salva o estado inicial do HTML assim que o componente carrega**
        this.originalContainerHTML = this.brandsColumnsContainer.innerHTML;
        
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

    // Limpa animações antigas para evitar sobreposições
    this.activeTimelines.forEach((tl) => tl.kill());
    this.activeTimelines = [];
    
    // **PASSO 2: Restaura o HTML para o estado original antes de qualquer manipulação**
    // Esta é a correção principal. Garante que sempre partimos de 3 colunas limpas.
    this.brandsColumnsContainer.innerHTML = this.originalContainerHTML;

    const allColumns: NodeListOf<HTMLElement> =
      this.brandsColumnsContainer.querySelectorAll('.brand-column');

    // **PASSO 3: Executa a sua lógica original em um DOM limpo**
    if (this.mediaMatcher.matches && allColumns.length === 3) {
      // Esconde a terceira coluna antes de mover os logos
      allColumns[2].style.display = 'none'; 
      const logosToMove = allColumns[2].querySelectorAll('.logo');

      logosToMove.forEach((logo, index) => {
        const targetColumnIndex = index % 2;
        allColumns[targetColumnIndex]
          .querySelector('.logo-slot')
          ?.appendChild(logo);
      });
    }

    // **PASSO 4: A sua animação original é aplicada no estado correto (2 ou 3 colunas)**
    const visibleColumns = Array.from(allColumns).filter((column) => {
      return column.style.display !== 'none';
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