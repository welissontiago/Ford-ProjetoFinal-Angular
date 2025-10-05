import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ListPersonComponent } from './list-person/list-person.component';

@Component({
  selector: 'app-propostas',
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule,
    MatButtonModule,
    ListPersonComponent,
  ],
  templateUrl: './propostas.component.html',
  styleUrl: './propostas.component.css',
})
export class PropostasComponent {}
