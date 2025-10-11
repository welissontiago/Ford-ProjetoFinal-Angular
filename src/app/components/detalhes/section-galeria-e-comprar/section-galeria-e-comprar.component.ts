import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../../core/services/cars.service';
import { Observable, switchMap } from 'rxjs';
import { Cars } from '../../../core/models/cars.model';
import { CommonModule } from '@angular/common';
import { GaleriaComponent } from '../galeria/galeria.component';
import { ComprarInfosComponent } from '../comprar-infos/comprar-infos.component';
import { TabsDetalheComponent } from '../tabs-detalhe/tabs-detalhe.component';

@Component({
  selector: 'app-section-galeria-e-comprar',
  imports: [
    CommonModule,
    GaleriaComponent,
    ComprarInfosComponent,
    TabsDetalheComponent,
  ],
  templateUrl: './section-galeria-e-comprar.component.html',
  styleUrl: './section-galeria-e-comprar.component.css',
})
export class SectionGaleriaEComprarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carsService = inject(CarsService);
  public car$!: Observable<Cars>;

  ngOnInit(): void {
    this.car$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const carId = params.get('id');
        if (carId) {
          return this.carsService.getCar(carId);
        }
        return new Observable<Cars>();
      })
    );
  }
}
