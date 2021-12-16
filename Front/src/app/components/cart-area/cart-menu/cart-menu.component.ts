import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { Subscription } from 'rxjs';
import CartModel from 'src/app/models/cart.model';
import OrderModel from 'src/app/models/order.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import { ItemService } from 'src/app/services/item.service';
import ItemModel from 'src/app/models/item.model';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.css']
})

  export class CartMenuComponent implements OnInit, OnDestroy {

  public user: UserModel;
  private unsubscribeMe: Unsubscribe;
  public items: ItemModel[];
  public cart: CartModel[];
  public totalCart: number = 0;
  public orders: OrderModel[];
  public openCart: boolean;
  public imageUrl = environment.productImagesUrl;

  private subscription: Subscription;

  searchQuery: string = '';

    constructor( private myActivatedRoute: ActivatedRoute, 
                  private myItemService: ItemService, 
                  private notify: NotifyService, 
                  private myOrdersService: OrderService,
                  private myCartService: CartsService,
                  private myRouter: Router,
                  ) {  

                    this.subscription = this.myItemService.getCartObservable().subscribe(async addedItem => {
                      if (addedItem) {
                          console.log(addedItem);
                          // UPDATE
                          const itemToPush = new ItemModel();
                          itemToPush.ProductName = addedItem.name;
                          // needs that because of num/string problems
                          itemToPush.ItemID = addedItem.item.ItemID;
                          itemToPush.Quantity = addedItem.item.Quantity;
                          itemToPush.TotalPrice = addedItem.item.TotalPrice;
                          itemToPush.imageName = addedItem.item.ProductID + ".jpg"
                          if (this.items) {
                            this.items.push(itemToPush);
                          } else {
                            const itemsArray = [itemToPush];
                            this.items = itemsArray;
                            this.openCart = true; 
                            this.cart[0].CartID = addedItem.item.CartID;   
                          }
                          this.totalCart = this.myItemService.totalCartPerUser(this.items);
                          this.myCartService.cartUpdate(false, this.totalCart, addedItem.item.CartID);
                      } else {
                      }
                  });

                    }

 async ngOnInit() {
      this.unsubscribeMe = store.subscribe(() => {
          this.user = store.getState().authState.user;
      });

      if (JSON.parse(localStorage.getItem('user'))) {
          this.user = store.getState().authState.user;
      }
    
       // GETS LAST ORDER
      try {
        this.orders = await this.myOrdersService.getLastOrderByUser(this.user.uuid);        
      }
      catch (err) {
          // this.notify.error(err);
      }

      // GETS LAST CART (OPEN OR CLOSED)
      try {
        this.cart = await this.myCartService.getLastCartByUser(this.user.uuid);   
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
          if (!this.items) { 
            // this.items = [];
            await this.myCartService.deleteCart(this.cart[0].CartID);
            this.getLastCart();
          };  // if the cart is empty ot items (aftr removal of an item ) -> delete the cart as well
        }
      }

      this.totalCart = this.myItemService.totalCartPerUser(this.items);

  }

  ngOnDestroy(): void {
      this.unsubscribeMe();
  }

  public async getLastCart() {
    try {
      this.cart = await this.myCartService.getLastCartByUser(this.user.uuid);   
    } catch (err) {
        // this.notify.error(err);
    }
  }

  public async deleteItem(id: number) {
    try {
        const answer = confirm("Are you sure you want to remove this item?");
        if (!answer) return;
        await this.myItemService.deleteItem(id);

        // to delete it from screen in real time
        const index = this.items.findIndex(p => p.ItemID === id);
          this.items.splice(index, 1);
        // this.notify.success("Item has been removed from cart.");
        this.totalCart = this.myItemService.totalCartPerUser(this.items);
        this.myCartService.cartUpdate(false, this.totalCart, this.cart[0].CartID); // mainly used for sending totalCart

        // then it send an automatic request to get GET all cart items, and then if it's empty already it's deleted...
    }
    catch (err) {
        // this.notify.error(err);
    }
    this.totalCart = this.myItemService.totalCartPerUser(this.items);
    console.log("total cart: " + this.totalCart);
    // if deleted last item -> delete cart as well
    if (this.items.length === 0) { 
      this.totalCart = 0; // already above
      await this.myCartService.deleteCart(this.cart[0].CartID);
      this.myCartService.cartUpdate(true, 0, -1); // notifies produst card that cart is closed
          // cartId = -1 --> because it's not used when cartClosed is true
      // this.openCart = false;
      // this.items = undefined;
      this.getLastCart();
    };
    // if (this.cartItems.length === 0) {this.deleteCart(this.cart[0].CartID)};
  }

  // THIS IS THE ACTUAL EMPTY CART ALSO DELETES CART'S ITEMS
  public async deleteCart(cartId: number) {
    try {
      const answer = confirm("Are you sure you want to empty your cart?");
      if (!answer) return;
      this.emptyCart(cartId);  // delete all cart's items
      await this.myCartService.deleteCart(cartId);
      this.openCart = false;
      this.items = undefined;
      // this.items = [];
      // this.notify.success("Cart has been emptied.");
      this.myCartService.cartUpdate(true, 0, -1); // notifies produst card that cart is closed
          // cartId = -1 --> because it's not used when cartClosed is true

      this.getLastCart();
    }
    catch (err) {
      this.notify.error(err);
    }
  }

  // deletes all the items of a (deleted) cart from db
  async emptyCart(cartId: number) {
    try {
      await this.myItemService.deleteAllItemsOfCart(cartId);
      // this.notify.success("emptied all items.");
      // this.items = undefined; // i yhik i don't need it
      this.myCartService.cartUpdate(true, 0, -1); // notifies produst card that cart is closed
          // cartId = -1 --> because it's not used when cartClosed is true

    }
    catch (err) {
      // this.notify.error(err);
    }
  }

  order() {
    this.myRouter.navigateByUrl("/order");
  }

  public isNotHome() {
    const h = this.myRouter.url.includes("/home");
    return !h
  }


  public isOrder() {
    const o = this.myRouter.url.includes("/order");
  return o
  }

}


