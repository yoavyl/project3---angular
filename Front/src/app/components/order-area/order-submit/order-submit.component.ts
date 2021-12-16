import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import OrderModel from 'src/app/models/order.model';
import { MatInputModule } from "@angular/material/input";
import UserModel from 'src/app/models/user.model';
import { Unsubscribe } from 'redux';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { NotifyService } from 'src/app/services/notify.service';
import store from 'src/app/redux/store';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { OrderSuccessDialogComponent } from '../order-success-dialog/order-success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import CityModel from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import ItemModel from 'src/app/models/item.model';
import { CartsService } from 'src/app/services/carts.service';
import CartModel from 'src/app/models/cart.model';
import { ItemService } from 'src/app/services/item.service';
// import { DatePipe } from '@angular/common';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { OrderBoxComponent } from '../order-box/order-box.component';


// export interface DialogData {
//   sure: string;
// }



@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.css']
})

export class OrderSubmitComponent implements OnInit, OnDestroy {

  public order = new OrderModel();
  public user: UserModel;
  public cart: CartModel[];
  private unsubscribeMe: Unsubscribe;
  private items: ItemModel[];
  public today: Date = new Date();

  private bookedDates: Array<{Delivery: Date, count: number}>;
  private myBookedDates: Date[] = [];

  public orderForm: FormGroup;
  public cityControl: FormControl;
  public streetControl: FormControl;
  public deliveryControl: FormControl;
  public creditControl: FormControl;
  public sure: Boolean;
  public cities: CityModel[];


    constructor(
      private myActivatedRoute: ActivatedRoute, 
      private myItemService: ItemService,
      private myCartService: CartsService,
      private myOrdersService: OrderService, 
      private myCityService: CityService,
      private notify: NotifyService, 
      private myRouter: Router,
      public dialog : MatDialog
      ) {  
        this.cityControl = new FormControl(null, [Validators.required]);
        this.streetControl = new FormControl(null, Validators.required);
        this.deliveryControl = new FormControl(null, [Validators.required]);
        // matches Visa, MasterCard, American Express, Diners Club, Discover, and JCB cards:
        // there is one more updated here? https://regex101.com/r/37S1iV/1
        this.creditControl = new FormControl(null, [Validators.required, Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$")]);
        this.orderForm = new FormGroup({
            cityControl: this.cityControl,
            streetControl: this.streetControl,
            deliveryControl: this.deliveryControl,
            creditControl: this.creditControl
          });
        }

        async ngOnInit() {
          this.unsubscribeMe = store.subscribe(() => {
              this.user = store.getState().authState.user;
          });

          if (JSON.parse(localStorage.getItem('user'))) {
              this.user = store.getState().authState.user;
          }

          const uuid = this.user.uuid;
          try {
            this.cart = await this.myCartService.getLastCartByUser(uuid);   
          } catch (err) {
              // this.notify.error(err);
          }

          try {
                this.cities = await this.myCityService.getAllCities();
          }  catch (err) {
                // this.notify.error(err);
          }

          try {
            this.items = await this.myItemService.getOpenCartItems(this.cart[0].CartID);     
          } catch (err) {
              // this.notify.error(err);
          }

          try {
            this.bookedDates = await this.myOrdersService.getFullyBookedDates()
          }  catch (err) {
                // this.notify.error(err);
          }

          for (let date of this.bookedDates) {
            const dateObj = new Date(date.Delivery)
            this.myBookedDates.push(dateObj);
          }
  }

  ngOnDestroy(): void {
      this.unsubscribeMe();
  }

  dblstreet() {
    this.streetControl.setValue(this.user.street);
  }

  public async submit() {
    const answer = confirm("Are you sure you want to ship your order?");
      if (!answer) return;
      try {
        this.order.UserUUID = this.user.uuid;
        this.order.CartID = this.cart[0].CartID;
        this.order.TotalPrice = this.myItemService.totalCartPerUser(this.items);
        this.order.Date = new Date().toString();
        this.order.City = this.cityControl.value;
        this.order.Street = this.streetControl.value;
        this.order.Delivery = this.deliveryControl.value.toDateString();
        this.order.CreditCard = this.creditControl.value.slice(-4);
        await this.myOrdersService.addOrder(this.order);    //// MUST SEPERATE IT INTO DIFFERENT FUNCTION LIKE IN PRODUCT-CARD-COMPONENT
        // this.notify.success("Order has been added.");
      }
      catch(err) {
          // this.notify.error(err);
      }
    
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrderSuccessDialogComponent,  {
    });

    dialogRef.afterClosed().subscribe(async result => {
    });
  }

  // blocks dates with 3 deliveries from datepicker
  myFilter = (d: Date): boolean => {
    return !this.myBookedDates.find(x=>x.getTime()==d.getTime());
  }
  

}
