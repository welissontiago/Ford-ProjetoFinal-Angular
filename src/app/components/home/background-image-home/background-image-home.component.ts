import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-background-image-home',
  imports: [],
  templateUrl: './background-image-home.component.html',
  styleUrl: './background-image-home.component.css',
})
export class BackgroundImageHomeComponent {
  public themeService = inject(ThemeService);
}
