import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import CartModel from 'src/app/models/cart.model';
import UserModel from 'src/app/models/user.model';
import { CartsService } from 'src/app/services/carts.service';
import { ItemService } from 'src/app/services/item.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-total-cart',
  templateUrl: './total-cart.component.html',
  styleUrls: ['./total-cart.component.css']
})
export class TotalCartComponent implements OnInit {

  // i did it this way so i can control the appearance of "total cart" message and buttons from this component
  // otherwise, *ngIf's don't hide/show those when multiple request are made from cart-menu component

  @Input()
  public totalCart: number;

  @Input()
  public cart: CartModel[];

  private subscription: Subscription;

    constructor(
      private myCartService: CartsService
      ) {
    
    this.subscription = this.myCartService.getCartOpenObservable().subscribe(message => {
      if (message) {
          // this updates all the cards!!! in one subscription i update them all!!
          this.totalCart = message.totalCart;
      } else {
          // this.openCart = true;
          // console.log("open cart was closed?");
          // console.log("open cart? " + this.openCart);
      }
      
  })
   }

  ngOnInit(): void {
  }

}
