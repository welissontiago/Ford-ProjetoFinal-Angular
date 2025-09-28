import { User } from './user.model';
import { Cars } from './cars.model';
import { Cores } from './cores.model';
import { PaymentData } from '../services/payment.service';

export interface Purchase {
  id?: string;
  user: User;
  car: Cars;
  selectedColor: Cores;
  payment: PaymentData;
  purchaseDate: Date;
}
