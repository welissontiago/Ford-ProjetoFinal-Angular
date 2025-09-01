import { Component } from '@angular/core';
import { LoginComponentComponent } from '../../components/login-component/login-component.component';

@Component({
  selector: 'app-login',
  imports: [LoginComponentComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
