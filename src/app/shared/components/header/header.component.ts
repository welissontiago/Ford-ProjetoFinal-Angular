import { Component, inject } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../../../core/services/theme.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MegamenuComponent } from './megamenu/megamenu.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';

@Component({
  selector: 'app-header',
  imports: [
    ThemeToggleComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MegamenuComponent,
    SearchFilterComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public themeService = inject(ThemeService);
}
