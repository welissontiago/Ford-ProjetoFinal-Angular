import { Component } from '@angular/core';
import { AdminComponent } from '../../components/admin/admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {}
