import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login-component',
  imports: [
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
  hide = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      checkboxLembreme: [''],
    });
  }
}
