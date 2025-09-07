import { Component, inject } from '@angular/core';
import { RegisterFormsComponent } from '../../components/register/register-forms/register-forms.component';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { ThemeService } from '../../core/services/theme.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RegisterFormsComponent, ThemeToggleComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public themeService = inject(ThemeService);
}
