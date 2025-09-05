import { Component } from '@angular/core';
import { RegisterFormsComponent } from '../../components/register/register-forms/register-forms.component';

@Component({
  selector: 'app-register',
  imports: [RegisterFormsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
