import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { LoginGoogleFacebookComponent } from '../login-google-facebook/login-google-facebook.component';
import { LoginRegisterCardComponent } from '../login-register-card/login-register-card.component';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-login-component',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    LoginGoogleFacebookComponent,
    LoginRegisterCardComponent,
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
})
export class LoginComponentComponent implements OnInit {
  loginForm!: FormGroup;
  private authService = inject(AuthService);
  public themeService = inject(ThemeService);
  private router = inject(Router);
  hide = true;
  loginInvalido = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checkboxLembreme: [''],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginInvalido = false;
      this.authService.login(this.loginForm.value as any).subscribe((users) => {
        if (users.length) {
          this.router.navigate(['/home']);
        } else {
          console.error('Email ou senha inválidos');
          this.loginInvalido = true;
        }
      });
    }
  }
}
