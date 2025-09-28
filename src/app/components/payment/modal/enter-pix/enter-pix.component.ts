import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-enter-pix',
  imports: [QRCodeComponent, MatDialogModule],
  templateUrl: './enter-pix.component.html',
  styleUrl: './enter-pix.component.css',
})
export class EnterPixComponent implements OnInit, OnDestroy {
  public qrCodeData = 'pagamento_realizado_com_sucesso';
  public countdown = 900;
  public displayTime = '15:00';
  private timerSubscription: Subscription | undefined;

  constructor(
    public dialogRef: MatDialogRef<EnterPixComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.countdown--;
      this.displayTime = this.formatTime(this.countdown);
      if (this.countdown <= 0) {
        this.dialogRef.close();
      }
    });
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  close(): void {
    this.dialogRef.close();
  }

  simularPagamento(): void {
    this.dialogRef.close('success');
  }
}
