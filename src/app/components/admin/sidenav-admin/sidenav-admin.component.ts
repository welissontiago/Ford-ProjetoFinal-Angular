import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { navbarData } from './nav-data';

@Component({
  selector: 'app-sidenav-admin',
  standalone: true,
  imports: [],
  templateUrl: './sidenav-admin.component.html',
  styleUrls: ['./sidenav-admin.component.css'],
})
export class SidenavAdminComponent {}
