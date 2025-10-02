import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { Cores } from '../../../core/models/cores.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Cars } from '../../../core/models/cars.model';
import { Validacoes } from '../../../core/validators/all.validator';
import { HttpClient } from '@angular/common/http';

import {
  PaymentService,
  PaymentData,
} from '../../../core/services/payment.service';
import { PhoneMaskDirective } from '../../../core/directives/phone-mask.directive';
import { CepMaskDirective } from '../../../core/directives/cep-mask.directive';
import { MatSelectModule } from '@angular/material/select';
import { WarningComponent } from './warning/warning.component';
import { PurchaseService } from '../../../core/services/purchase.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Purchase } from '../../../core/models/purchase.model';
import { User } from '../../../core/models/user.model';
import { SuccessModalComponent } from '../modal/success-modal/success-modal.component';
import { EnterPixComponent } from '../modal/enter-pix/enter-pix.component';
import { MatDialog } from '@angular/material/dialog';
import { CarsService } from '../../../core/services/cars.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PhoneMaskDirective,
    CepMaskDirective,
    MatSelectModule,
    WarningComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent implements OnChanges, OnInit {
  @Input() cores: Cores[] = [];
  @Input() car!: Cars;
  @Input() corSelecionada?: Cores;
  @Output() corSelecionadaChange = new EventEmitter<Cores>();
  private carsService = inject(CarsService);

  @ViewChild(MatStepper) stepper!: MatStepper;

  private _formBuilder = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private http = inject(HttpClient);
  private purchaseService = inject(PurchaseService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private currentUser: User | null = null;
  public dialog = inject(MatDialog);

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  financingForm!: FormGroup;
  threeFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;

  isEditable = true;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.firstFormGroup = this._formBuilder.group({
      corCtrl: [this.corSelecionada, Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      paymentMethod: [null, Validators.required],
    });

    this.financingForm = this._formBuilder.group({
      downPayment: ['', [Validators.required, this.minDownPaymentValidator()]],
      installments: ['', [Validators.required, Validators.min(1)]],
    });

    this.secondFormGroup
      .get('paymentMethod')
      ?.valueChanges.subscribe((value) => {
        const currentData = this.paymentService.getPaymentData();
        const newData: PaymentData = { ...currentData, paymentMethod: value };

        if (value === 'financing') {
          this.secondFormGroup.setControl(
            'financingDetails',
            this.financingForm
          );
        } else {
          this.secondFormGroup.removeControl('financingDetails');
          this.financingForm.reset();
        }
        this.paymentService.updatePaymentData(newData);
      });
    this.financingForm.valueChanges.subscribe((values) => {
      if (this.secondFormGroup.get('paymentMethod')?.value === 'financing') {
        const currentData = this.paymentService.getPaymentData();
        const newData: PaymentData = { ...currentData, ...values };
        this.paymentService.updatePaymentData(newData);
      }
    });

    this.threeFormGroup = this._formBuilder.group({
      nome_completo: ['', [Validators.required, Validators.minLength(3)]],
      cpf: [
        '',
        Validators.compose([Validators.required, Validacoes.ValidaCpf]),
      ],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validacoes.ValidaTelefone]],
      rg: ['', Validators.required],
      renda: ['', Validators.required],
      cep: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)],
        [Validacoes.cepExiste(this.http)],
      ],
      endereco: [''],
      cidade: [''],
    });
    this.threeFormGroup.get('cep')?.valueChanges.subscribe((cep: string) => {
      const apenasNumeros = cep?.replace(/\D/g, '');
      if (apenasNumeros && apenasNumeros.length === 8) {
        this.http
          .get<any>(`https://viacep.com.br/ws/${apenasNumeros}/json/`)
          .subscribe((res) => {
            if (!res.erro) {
              this.threeFormGroup.patchValue({
                endereco: res.logouro,
                cidade: res.localidade,
              });
            } else {
              this.threeFormGroup.patchValue({ endereco: '', cidade: '' });
            }
          });
      }
    });
    if (this.currentUser) {
      this.threeFormGroup.patchValue({
        nome_completo: this.currentUser.name,
        email: this.currentUser.email,
        telefone: this.currentUser.phone,
      });
    }

    this.paymentFormGroup = this._formBuilder.group({
      banco: ['', Validators.required],
      digito: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      agencia: ['', Validators.required],
      nomeDoTitular: ['', Validators.required],
      numeroDaConta: ['', Validators.required],
      cpfDoTitular: [
        '',
        Validators.compose([Validators.required, Validacoes.ValidaCpf]),
      ],
    });
  }

  minDownPaymentValidator(): (
    control: AbstractControl
  ) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.car) {
        return null;
      }
      const downPayment = control.value;
      const minDownPayment = this.precoFinal * 0.15;

      return downPayment >= minDownPayment
        ? null
        : {
            minDownPayment: {
              requiredValue: minDownPayment,
              actualValue: downPayment,
            },
          };
    };
  }

  selecionarCor(cor: Cores) {
    this.corSelecionadaChange.emit(cor);
    this.firstFormGroup.controls['corCtrl'].setValue(cor);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['corSelecionada'] && this.corSelecionada) {
      this.firstFormGroup?.controls['corCtrl'].setValue(this.corSelecionada);
    }
    if (changes['car'] && this.financingForm) {
      this.financingForm.get('downPayment')?.updateValueAndValidity();
    }
  }

  get precoFinal(): number {
    if (!this.car) return 0;
    const adicional = this.corSelecionada?.precoAdicional ?? 0;
    return this.car.preco + adicional;
  }

  get precoFinalComDesconto(): number {
    return this.precoFinal * 0.95;
  }
  get valorParcela(): number {
    if (!this.financingForm.valid || !this.car) {
      return 0;
    }
    const entrada = this.financingForm.get('downPayment')?.value;
    const parcelas = this.financingForm.get('installments')?.value;
    if (parcelas > 0) {
      return (this.precoFinal - entrada) / parcelas;
    }
    return 0;
  }

  openPixModal(): void {
    const dialogRef = this.dialog.open(EnterPixComponent, {
      width: '600px',
      height: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.openSuccessModal();
      }
    });
  }

  openSuccessModal(): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
      this.stepper.reset();
    });
  }

  finalizePurchase(): void {
    const currentUser: User | null = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('Usuário não está logado!');
      return;
    }

    if (
      !this.car ||
      !this.corSelecionada ||
      !this.paymentService.getPaymentData()
    ) {
      console.error('Dados da compra incompletos!');
      return;
    }

    const purchaseData: Omit<Purchase, 'id'> = {
      user: currentUser,
      car: this.car,
      selectedColor: this.corSelecionada,
      payment: this.paymentService.getPaymentData(),
      purchaseDate: new Date(),
    };

    this.purchaseService.savePurchase(purchaseData).subscribe({
      next: () => {
        console.log('Compra finalizada com sucesso!');
        if (this.car && this.car.id) {
          this.car.estoque -= 1;
          this.carsService.updateCar(this.car).subscribe({
            next: () => console.log('Estoque atualizado!'),
            error: (err) => console.error('Erro ao atualizar o estoque:', err),
          });
        }
        this.router.navigate(['/home']);
        this.stepper.reset();
      },
      error: (err) => console.error('Erro ao finalizar a compra:', err),
    });
  }

  get paymentMethod() {
    return this.secondFormGroup.get('paymentMethod')?.value;
  }

  get downPayment() {
    return this.financingForm.get('downPayment')?.value;
  }

  get installments() {
    return this.financingForm.get('installments')?.value;
  }
}
