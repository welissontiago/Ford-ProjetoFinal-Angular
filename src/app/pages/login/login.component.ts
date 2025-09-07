import { Component, inject } from '@angular/core';
import { LoginComponentComponent } from '../../components/login-component/login-component.component';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-login',
  imports: [LoginComponentComponent, ThemeToggleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public themeService = inject(ThemeService);
}
