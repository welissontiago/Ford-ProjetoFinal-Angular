import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { CarsService } from '../../../../core/services/cars.service';
import { Cars } from '../../../../core/models/cars.model';
import { MatSelectModule } from '@angular/material/select';
import { Cores } from '../../../../core/models/cores.model';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-add-vehicle',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    MatStepperModule,
  ],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private carsService = inject(CarsService);
  categorias: string[] = ['SUV', 'Esportivo', 'Picape'];
  combustiveis: string[] = [
    'Gasolina',
    'Eletrico',
    'Hibrido',
    'Diesel',
    'Etanol',
  ];

  addForm!: FormGroup;

  ngOnInit(): void {
    this.addForm = this.fb.group({
      nome: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      preco: ['', Validators.required],
      estoque: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem_principal: ['', Validators.required],
      cores: this.fb.array([]),
      combustiveis: ['', Validators.required],
      destaque: [false],
      categoria: ['', Validators.required],
      historia: ['', Validators.required],
      especificacoes: this.fb.group({
        motor: [''],
        potencia: [''],
        torque: [''],
        aceleracao: [''],
        suspensao: [''],
        velocidade_maxima: [''],
        combustivel: [''],
        tracao: [''],
        aceleracao_0_100: [''],
      }),
      equipamentos: this.fb.group({
        seguranca: this.fb.array([]),
        tecnologia: this.fb.array([]),
        interior: this.fb.array([]),
      }),
      galeria: this.fb.array([], [Validators.maxLength(10)]),
    });
  }

  get cores() {
    return this.addForm.get('cores') as FormArray;
  }

  createCorGroup(
    cor: Cores = { nome: '', precoAdicional: 0, codigoCor: '', imagem: '' }
  ): FormGroup {
    return this.fb.group({
      nome: [cor.nome, Validators.required],
      precoAdicional: [
        cor.precoAdicional,
        [Validators.required, Validators.min(0)],
      ],
      codigoCor: [cor.codigoCor, Validators.required],
      imagem: [cor.imagem, Validators.required],
    });
  }

  addCor(cor?: Cores): void {
    const corGroup = this.createCorGroup(cor);
    this.cores.push(corGroup);
  }

  removeCor(index: number): void {
    this.cores.removeAt(index);
  }

  onFileSelectedCor(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const corGroup = this.cores.at(index) as FormGroup;
        corGroup.get('imagem')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  get galeria() {
    return this.addForm.get('galeria') as FormArray;
  }

  get seguranca() {
    return (this.addForm.get('equipamentos') as FormGroup).get(
      'seguranca'
    ) as FormArray;
  }

  get tecnologia() {
    return (this.addForm.get('equipamentos') as FormGroup).get(
      'tecnologia'
    ) as FormArray;
  }

  get interior() {
    return (this.addForm.get('equipamentos') as FormGroup).get(
      'interior'
    ) as FormArray;
  }

  private getFormArrayByName(arrayName: string): FormArray {
    switch (arrayName) {
      case 'cores':
        return this.cores;
      case 'galeria':
        return this.galeria;
      case 'seguranca':
        return this.seguranca;
      case 'tecnologia':
        return this.tecnologia;
      case 'interior':
        return this.interior;
      default:
        throw new Error(`FormArray com o nome '${arrayName}' não encontrado.`);
    }
  }

  addControl(arrayName: string): void {
    const formArray = this.getFormArrayByName(arrayName);
    formArray.push(this.fb.control('', Validators.required));
  }

  removeControl(arrayName: string, index: number): void {
    const formArray = this.getFormArrayByName(arrayName);
    formArray.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file) => this.readFile(file));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      Array.from(event.dataTransfer.files).forEach((file) =>
        this.readFile(file)
      );
    }
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.galeria.push(this.fb.control(reader.result as string));
    };
    reader.readAsDataURL(file);
  }

  onFileSelectedPrincipal(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.readFilePrincipal(input.files[0]);
    }
  }

  onFileDroppedPrincipal(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.readFilePrincipal(event.dataTransfer.files[0]);
    }
  }

  private readFilePrincipal(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.addForm.get('imagem_principal')?.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const newCar: Omit<Cars, 'id'> = {
        ...this.addForm.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.carsService.addCar(newCar).subscribe(() => {
        this.router.navigate(['/dashboard/dashboard-home']);
      });
    }
  }
}
