import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../../core/services/cars.service';
import { Observable } from 'rxjs';
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
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.car$ = this.carsService.getCar(+carId);
    }
  }
}
