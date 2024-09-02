import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Carro {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;
}

@Component({
  selector: 'app-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.scss'],
})
export class AddCarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Carro
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
