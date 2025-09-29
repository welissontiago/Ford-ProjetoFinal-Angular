import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { CdkStepLabel } from "@angular/cdk/stepper";

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css'],
  imports:[],
})
export class SuccessModalComponent implements AfterViewInit {
  @ViewChild('dotlottieCanvas') dotlottieCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(public dialogRef: MatDialogRef<SuccessModalComponent>) {}

  ngAfterViewInit(): void {
    new DotLottie({
      autoplay: true,
      loop: true,
      canvas: this.dotlottieCanvas.nativeElement,
      src: 'https://lottie.host/41fdb70d-cc13-48de-8f99-0ef96bd252b9/S1Ca3vRmaT.lottie',
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}