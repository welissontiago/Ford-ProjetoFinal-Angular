import { Component, inject, OnInit } from '@angular/core';
import { LoginRegisterCardComponent } from '../../login-register-card/login-register-card.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginGoogleFacebookComponent } from '../../login-google-facebook/login-google-facebook.component';

@Component({
  selector: 'app-register-forms',
  imports: [
    LoginGoogleFacebookComponent,
    LoginRegisterCardComponent,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './register-forms.component.html',
  styleUrl: './register-forms.component.css',
})
export class RegisterFormsComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  private router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      checkboxTermos: ['', [Validators.required]],
      checkboxNewsLetter: [''],
    });
  }

  onSubmit() {}
}
