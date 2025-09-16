import { Component, inject } from '@angular/core';
import { FiltroBuscaComponent } from '../filtro-busca/filtro-busca.component';
import { CardsCarrosInventarioComponent } from '../cards-carros-inventario/cards-carros-inventario.component';
import { CarsService } from '../../../core/services/cars.service';
import { Observable } from 'rxjs';
import { Cars } from '../../../core/models/cars.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container-inventario',
  imports: [FiltroBuscaComponent, CardsCarrosInventarioComponent, CommonModule],
  templateUrl: './container-inventario.component.html',
  styleUrl: './container-inventario.component.css',
})
export class ContainerInventarioComponent {
  private carsService = inject(CarsService);
  public allCars$!: Observable<Cars[]>;

  ngOnInit(): void {
    this.allCars$ = this.carsService.getCars();
  }
}
