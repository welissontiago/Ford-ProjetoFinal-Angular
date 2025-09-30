import { Component } from '@angular/core';
import { SidenavAdminComponent } from '../../components/admin/sidenav-admin/sidenav-admin.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SidenavAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;
}
