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
    return this.http.post<Purchase>(this.apiUrl, purchase);
  }
}
