import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PaymentData {
  paymentMethod: 'pix' | 'card' | 'financing' | null;
  downPayment?: number;
  installments?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentDataSource = new BehaviorSubject<PaymentData>({
    paymentMethod: null,
  });

  currentPaymentData = this.paymentDataSource.asObservable();

  constructor() {}
  updatePaymentData(data: PaymentData) {
    this.paymentDataSource.next(data);
  }

  getPaymentData(): PaymentData {
    return this.paymentDataSource.getValue();
  }

  submitPurchase() {
    const paymentData = this.getPaymentData();
    console.log('Enviando para o backend:', paymentData);
  }
}
