import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-megamenu',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css',
})
export class MegamenuComponent {
  public themeService = inject(ThemeService);
}
