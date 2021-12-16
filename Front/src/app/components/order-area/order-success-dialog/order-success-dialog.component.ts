import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import OrderModel from 'src/app/models/order.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-success-dialog',
  templateUrl: './order-success-dialog.component.html',
  styleUrls: ['./order-success-dialog.component.css']
})
export class OrderSuccessDialogComponent {


  public orders: OrderModel[];
  private unsubscribeMe: Unsubscribe;
  private user: UserModel;
  public fileName: string;
  public fileDir = "http://localhost:3030/api/orders/pdf/";

  constructor(
    public dialogRef: MatDialogRef<OrderSuccessDialogComponent>,
    private myRouter: Router,
    private myOrdersService: OrderService,
    private notify: NotifyService,
    private myCartService: CartsService
    ) {}


  async ngOnInit() {
    this.unsubscribeMe = store.subscribe(() => {
      this.user = store.getState().authState.user;
  });

  if (JSON.parse(localStorage.getItem('user'))) {
      this.user = store.getState().authState.user;
  }

  const uuid = this.user.uuid;
     // GETS LAST ORDER
     try {
      this.orders = await this.myOrdersService.getLastOrderByUser(uuid);       
      this.fileName = `Order${this.orders[0].OrderID}.pdf`
    } catch (err) {
        // this.notify.error(err);
    }

    this.myCartService.cartUpdate(true, 0, -1); // notifies product card that cart is closed
    // cartId = -1 --> because it's not used when cartClosed is true
  }
  
  onNoClick(): void {
    this.dialogRef.close();
    this.myRouter.navigateByUrl("/home");

  }

  ngOnDestroy(): void {
    this.unsubscribeMe();
  }


}
