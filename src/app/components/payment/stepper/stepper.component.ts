import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Cores } from '../../../core/models/cores.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Cars } from '../../../core/models/cars.model';

@Component({
  selector: 'app-stepper',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent implements OnChanges {
  @Input() cores: Cores[] = [];
  @Input() car!: Cars;
  @Input() corSelecionada?: Cores;
  @Output() corSelecionadaChange = new EventEmitter<Cores>();

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    corCtrl: [null as Cores | null, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  threeFormGroup = this._formBuilder.group({
    threeCtrl: ['', Validators.required],
  });
  fourFormGroup = this._formBuilder.group({
    fourCtrl: ['', Validators.required],
  });
  isEditable = true;

  selecionarCor(cor: Cores) {
    this.corSelecionadaChange.emit(cor);
    this.firstFormGroup.controls.corCtrl.setValue(cor);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['corSelecionada'] && this.corSelecionada) {
      this.firstFormGroup.controls.corCtrl.setValue(this.corSelecionada);
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
}
