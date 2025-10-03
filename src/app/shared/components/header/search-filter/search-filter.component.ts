import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Cars } from '../../../../core/models/cars.model';
import { CarsService } from '../../../../core/services/cars.service';

@Component({
  selector: 'app-search-filter',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent implements OnInit {
  private carsService = inject(CarsService);
  private router = inject(Router);

  carCtrl = new FormControl<string | Cars>('');
  filteredCars!: Observable<Cars[]>;
  cars: Cars[] = [];

  ngOnInit(): void {
    this.carsService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.filteredCars = this.carCtrl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.nome ?? '')),
        map((name) => (name ? this._filterCars(name) : this.cars.slice()))
      );
    });
  }

  private _filterCars(value: string): Cars[] {
    const filterValue = value.toLowerCase();
    return this.cars.filter((car) =>
      car.nome.toLowerCase().includes(filterValue)
    );
  }

  displayFn(car: Cars): string {
    return car && car.nome ? car.nome : '';
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const car: Cars = event.option.value;
    this.router.navigate(['/veiculo', car.id]);
  }
}
