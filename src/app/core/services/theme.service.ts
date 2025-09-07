import {
  Injectable,
  signal,
  effect,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentTheme = signal<'light' | 'dark'>(this.getInitialTheme());
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    effect(() => {
      const theme = this.currentTheme();
      localStorage.setItem('app-theme', theme);
      if (theme === 'light') {
        this.renderer.addClass(document.body, 'light-theme');
      } else {
        this.renderer.removeClass(document.body, 'light-theme');
      }
    });
  }

  private getInitialTheme(): 'light' | 'dark' {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('app-theme');
      return savedTheme === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  }

  public toggleTheme(): void {
    this.currentTheme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }
}
