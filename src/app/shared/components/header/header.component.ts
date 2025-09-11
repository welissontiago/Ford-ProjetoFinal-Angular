import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../../../core/services/theme.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MegamenuComponent } from './megamenu/megamenu.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ThemeToggleComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MegamenuComponent,
    SearchFilterComponent,
    MatSidenavModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public themeService = inject(ThemeService);

  @Output() menuToggle = new EventEmitter<void>();

  onMenuClick(): void {
    this.menuToggle.emit();
  }
}
