import { Component } from '@angular/core';
import { PaymentComponent } from '../../components/payment/payment.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-pagamento',
  imports: [PaymentComponent, HeaderComponent, FooterComponent],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css',
})
export class PagamentoComponent {}
