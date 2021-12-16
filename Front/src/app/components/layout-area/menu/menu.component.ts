import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import CartItemModel from 'src/app/models/item.model';
import CartModel from 'src/app/models/cart.model';
import OrderModel from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
    // export class MenuComponent {
    public user: UserModel;
    public isAdmin: boolean;
    private unsubscribeMe: Unsubscribe;
    public cart: CartModel[];
    public orders: OrderModel[];
    public openCart: boolean;

    public products: string;
    private subscription: Subscription;


    constructor(
        private notify: NotifyService, 
        private myOrdersService: OrderService,
        private myCartService: CartsService,
        private router: Router) {   
            this.subscription = this.myCartService.getCartOpenObservable().subscribe(message => {
                if (message.cartClosed) {
                    // this updates all the cards!!! in one subscription i update them all!!
                    this.openCart = false;
                } else {
                    this.openCart = true;
                }
                
            })
         }


    async ngOnInit() {
        this.unsubscribeMe = store.subscribe(() => {
            this.isAdmin = store.getState().authState.user?.isAdmin;
            this.user = store.getState().authState.user;
        });

        if (JSON.parse(localStorage.getItem('user'))) {
            this.user = store.getState().authState.user;
        
        }

      const uuid = this.user.uuid;
     // GETS LAST ORDER
    try {
        this.orders = await this.myOrdersService.getLastOrderByUser(uuid);
    }
      catch (err) {
        //   this.notify.error(err);
      }
  
      // GETS LAST CART (OPEN OR CLOSED)
      try {
        this.cart = await this.myCartService.getLastCartByUser(uuid);   
      } catch (err) {
        //   this.notify.error(err);
      }
  
      // CHECKS IF THE LAST CART IS OPEN (no match for last order)
      if (this.orders[0].CartID === this.cart[0].CartID) {this.openCart = false} else {this.openCart = true}

   }
    

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }
   
}
