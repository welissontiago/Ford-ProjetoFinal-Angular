import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Purchase } from '../../../../core/models/purchase.model';
import { forkJoin, Observable } from 'rxjs';
import { PurchaseService } from '../../../../core/services/purchase.service';

@Component({
  selector: 'app-list-person',
  imports: [
    MatDividerModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.css',
})
export class ListPersonComponent {
  @Input() person!: Purchase;
  persons: Purchase[] = [];
  featuredPersonCount = 0;
  public AllPersons$!: Observable<Purchase[]>;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    forkJoin({
      persons: this.purchaseService.getAllPurchases(),
    }).subscribe(({ persons }) => {
      this.persons = persons;
      this.featuredPersonCount = persons.length;
    });
  }
}
