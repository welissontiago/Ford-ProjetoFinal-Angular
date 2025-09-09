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
import { AuthService } from '../../../core/services/auth.service';
import { passwordMatchValidator } from '../../../core/validators/password-match.validator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TermosComponent } from '../termos/termos.component';

@Component({
  selector: 'app-register-forms',
  standalone: true,
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
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]],
        checkboxTermos: [false, [Validators.requiredTrue]],
        checkboxNewsLetter: [false],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(TermosComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value as any)
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }
  }
}
