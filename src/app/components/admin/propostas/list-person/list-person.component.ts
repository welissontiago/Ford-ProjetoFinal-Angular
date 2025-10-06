import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Purchase } from '../../../../core/models/purchase.model';
import { forkJoin, Observable } from 'rxjs';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-list-person',
  imports: [
    MatDividerModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
  ],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.css',
})
export class ListPersonComponent implements OnInit {
  @Input() person!: Purchase;
  persons: Purchase[] = [];
  public AllPersons$!: Observable<Purchase[]>;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.AllPersons$ = this.purchaseService.getAllPurchases();
    this.AllPersons$.subscribe((persons) => (this.persons = persons));
  }

  approvePurchase(person: Purchase): void {
    person.status = 'aprovado';
    this.purchaseService.updatePurchase(person).subscribe(() => {
      this.loadPurchases();
    });
  }

  rejectPurchase(person: Purchase): void {
    person.status = 'rejeitado';
    this.purchaseService.updatePurchase(person).subscribe(() => {
      this.loadPurchases();
    });
  }
}
