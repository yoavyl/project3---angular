import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DialogData } from '../../products-area/product-card/product-card.component';


@Component({
  selector: 'app-order-units-dialog',
  templateUrl: './order-units-dialog.component.html',
  styleUrls: ['./order-units-dialog.component.css']
})
export class OrderUnitsDialogComponent implements OnInit {

  public imageUrl = environment.productImagesUrl;

  constructor(
    public dialogRef: MatDialogRef<OrderUnitsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  ngOnInit() {
    console.log("from dialog box: " + this.data.name);
    console.log(this.data.imageName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
