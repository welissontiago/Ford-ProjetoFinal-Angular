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
import { MatListModule } from '@angular/material/list';
import { MegamenuMobileComponent } from './megamenu-mobile/megamenu-mobile.component';
import { AuthService } from '../../../core/services/auth.service';

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
    MatListModule,
    MegamenuMobileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public themeService = inject(ThemeService);
  private authService = inject(AuthService);
  isMenuOpen = false;

  @Output() menuToggle = new EventEmitter<void>();

  onMenuClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
