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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarsService } from '../../../../core/services/cars.service';
import { Cars } from '../../../../core/models/cars.model';

@Component({
  selector: 'app-vehicle-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './vehicle-edit.component.html',
  styleUrl: './vehicle-edit.component.css',
})
export class VehicleEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private carsService = inject(CarsService);

  editForm!: FormGroup;
  vehicleId!: number;

  ngOnInit(): void {
    this.vehicleId = +this.route.snapshot.paramMap.get('id')!;
    this.editForm = this.fb.group({
      nome: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: ['', Validators.required],
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
      galeria: this.fb.array([]),
    });

    this.carsService.getCar(this.vehicleId).subscribe((car) => {
      this.editForm.patchValue(car);
      car.cores.forEach((cor) => this.cores.push(this.fb.control(cor)));
      car.galeria.forEach((img) => this.galeria.push(this.fb.control(img)));
      car.equipamentos.seguranca.forEach((item) =>
        this.seguranca.push(this.fb.control(item))
      );
      car.equipamentos.tecnologia.forEach((item) =>
        this.tecnologia.push(this.fb.control(item))
      );
      car.equipamentos.interior.forEach((item) =>
        this.interior.push(this.fb.control(item))
      );
    });
  }

  get cores() {
    return this.editForm.get('cores') as FormArray;
  }

  get galeria() {
    return this.editForm.get('galeria') as FormArray;
  }

  get seguranca() {
    return (this.editForm.get('equipamentos') as FormGroup).get(
      'seguranca'
    ) as FormArray;
  }

  get tecnologia() {
    return (this.editForm.get('equipamentos') as FormGroup).get(
      'tecnologia'
    ) as FormArray;
  }

  get interior() {
    return (this.editForm.get('equipamentos') as FormGroup).get(
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

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedCar: Cars = { ...this.editForm.value, id: this.vehicleId };
      this.carsService.updateCar(updatedCar).subscribe(() => {
        this.router.navigate(['/dashboard/dashboard-home']);
      });
    }
  }
}
