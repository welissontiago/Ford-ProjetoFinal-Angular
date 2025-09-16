import { Component, inject } from '@angular/core';
import { FiltroBuscaComponent } from '../filtro-busca/filtro-busca.component';
import { CardsCarrosInventarioComponent } from '../cards-carros-inventario/cards-carros-inventario.component';
import { CarsService } from '../../../core/services/cars.service';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { Cars } from '../../../core/models/cars.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container-inventario',
  standalone: true,
  imports: [FiltroBuscaComponent, CardsCarrosInventarioComponent, CommonModule],
  templateUrl: './container-inventario.component.html',
  styleUrls: ['./container-inventario.component.css'],
})
export class ContainerInventarioComponent {
  private carsService = inject(CarsService);

  private filtrosSubject = new BehaviorSubject<any>({
    categoria: null,
    ano: null,
    combustivel: null,
    preco: null,
  });

  public carsFiltrados$!: Observable<Cars[]>;

  ngOnInit(): void {
    const allCars$ = this.carsService.getCars();

    this.carsFiltrados$ = combineLatest([allCars$, this.filtrosSubject]).pipe(
      map(([cars, filtros]) => {
        return cars.filter((car) => {
          const atendeCategoria =
            !filtros.categoria ||
            car.categoria.toLowerCase() === filtros.categoria.toLowerCase();

          const atendeAno = !filtros.ano || car.ano === +filtros.ano;

          const atendeCombustivel =
            !filtros.combustivel ||
            car.combustiveis
              .toLowerCase()
              .includes(filtros.combustivel.toLowerCase());

          const atendePreco =
            !filtros.preco ||
            this.verificarFaixaPreco(car.preco, filtros.preco);

          return (
            atendeCategoria && atendeAno && atendeCombustivel && atendePreco
          );
        });
      })
    );
  }

  aplicarFiltros(filtros: any) {
    this.filtrosSubject.next(filtros);
  }

  private verificarFaixaPreco(preco: number, faixa: string): boolean {
    switch (faixa) {
      case 'preco-1':
        return preco >= 20000 && preco <= 50000;
      case 'preco-2':
        return preco >= 50001 && preco <= 99999;
      case 'preco-3':
        return preco >= 100000 && preco <= 200000;
      case 'preco-4':
        return preco >= 200001 && preco <= 800000;
      default:
        return true;
    }
  }
}
