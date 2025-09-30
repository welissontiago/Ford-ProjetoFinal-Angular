import { Component, EventEmitter, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface SideNavToglle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidenav-admin.component.html',
  styleUrl: './sidenav-admin.component.css',
})
export class SidenavAdminComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToglle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  togglecollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
