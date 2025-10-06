import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private readonly apiUrl = 'http://localhost:3001/purchases';
  private http = inject(HttpClient);

  savePurchase(purchase: Omit<Purchase, 'id'>): Observable<Purchase> {
    const purchaseWithStatus = { ...purchase, status: 'pendente' } as Omit<
      Purchase,
      'id'
    >;
    return this.http.post<Purchase>(this.apiUrl, purchaseWithStatus);
  }

  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.apiUrl);
  }

  updatePurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.apiUrl}/${purchase.id}`, purchase);
  }
}
