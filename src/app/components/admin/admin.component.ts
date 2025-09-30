import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ThemeToggleComponent,
    RouterModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  sidenavCollapsed = false;

  navData = [
    { icon: 'dashboard', label: 'Dashboard', router: '/dashboard-home' },
    { icon: 'airport_shuttle', label: 'Veiculos', router: '/veiculos' },
    { icon: 'emoji_people', label: 'Propostas', router: '/propostas' },
    { icon: 'bar_chart_4_bars', label: 'Relatórios', router: '/relatorios' },
    { icon: 'settings', label: 'Configurações', router: '/dashboard-home' },
  ];

  toggleSidenav(): void {
    this.sidenavCollapsed = !this.sidenavCollapsed;
  }
}
