import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../core/services/cars.service';
import { Observable } from 'rxjs';
import { Cars } from '../../core/models/cars.model';
import { GaleriaComponent } from '../../components/detalhes/galeria/galeria.component';

@Component({
  selector: 'app-detalhes-veiculo',
  imports: [CommonModule, GaleriaComponent],
  templateUrl: './detalhes-veiculo.component.html',
  styleUrl: './detalhes-veiculo.component.css',
})
export class DetalhesVeiculoComponent implements OnInit {
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
