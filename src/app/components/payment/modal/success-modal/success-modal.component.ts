import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css'],
})
export class SuccessModalComponent {
  constructor(public dialogRef: MatDialogRef<SuccessModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
