import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-filtro-busca',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './filtro-busca.component.html',
  styleUrl: './filtro-busca.component.css',
})
export class FiltroBuscaComponent {}
