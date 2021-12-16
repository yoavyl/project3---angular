import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import OrderModel from 'src/app/models/order.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';
import { ItemService } from 'src/app/services/item.service';
import ItemModel from 'src/app/models/item.model';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent implements OnInit, OnDestroy {
  public user: UserModel;
  public isAdmin: boolean;
  private unsubscribeMe: Unsubscribe;
  public items: ItemModel[];
  public cart: CartModel[];
  public totalCart: number;
  public orders: OrderModel[];
  public products: string;

  public openCart: boolean;

  constructor(
    private myItemService: ItemService, 
    private myCartService: CartsService, 
    private myOrdersService: OrderService, 
    private notify: NotifyService, 
    private router: Router, 
    ) {    }


  async ngOnInit() {
      this.unsubscribeMe = store.subscribe(() => {
          this.isAdmin = store.getState().authState.user?.isAdmin;
      });

      this.unsubscribeMe = store.subscribe(() => {
          this.user = store.getState().authState.user;
      });
  
      if (JSON.parse(localStorage.getItem('user'))) {
          this.user = store.getState().authState.user;
      
      }

    const uuid = this.user.uuid;
    console.log("uuid: " + uuid)

    // GETS LAST ORDER
    try {
      this.orders = await this.myOrdersService.getLastOrderByUser(uuid);        }
    catch (err) {
        // this.notify.error(err);
    }

    // GETS LAST CART (OPEN OR CLOSED)
    try {
      this.cart = await this.myCartService.getLastCartByUser(uuid);   
    } catch (err) {
        // this.notify.error(err);
    }

    // CHECKS IF THE LAST CART IS OPEN (no match for last order)
    if (this.orders[0].CartID === this.cart[0].CartID) {this.openCart = false} else {this.openCart = true}

    // if there is an open cart -> get this.cart items
    if (this.openCart) {
      try {
        this.items = await this.myItemService.getOpenCartItems(this.cart[0].CartID);  
      } catch (err) {
          // this.notify.error(err);
      }
    }

    // Total price for cart
    if (this.items) {
      this.totalCart = this.myItemService.totalCartPerUser(this.items);
    }

 }
  

  ngOnDestroy(): void {
      this.unsubscribeMe();
  }

 
}
