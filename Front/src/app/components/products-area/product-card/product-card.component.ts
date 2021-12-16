import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import ProductModel from 'src/app/models/product.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { OrderUnitsDialogComponent } from '../../order-area/order-units-dialog/order-units-dialog.component';
import { CartsService } from 'src/app/services/carts.service';
import CartModel from 'src/app/models/cart.model';
import OrderModel from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ItemService } from 'src/app/services/item.service';
import ItemModel from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

export interface DialogData {
    imageName: any;
    name: string;
    quantity: number;
  }


@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

    @Input()
    public product: ProductModel;

    public item = new ItemModel();
    public user: UserModel;
    private cart: CartModel[];
    private orders: OrderModel[];
    private openCart: boolean;
    public newCart  = new CartModel();

    private subscription: Subscription;

    public imageUrl = environment.productImagesUrl;
    public quantity: number = 1;
    // public name: string;
    private unsubscribeMe: Unsubscribe;



    constructor(
        public dialog : MatDialog, 
        private myOrdersService: OrderService,
        private myItemService: ItemService, 
        private myCartService: CartsService,
        private myProductService: ProductsService,
        private notify: NotifyService, 
    ) {
        this.subscription = this.myCartService.getCartOpenObservable().subscribe(message => {
            if (message.cartClosed) {
                // this updates all the cards!!! in one subscription i update them all!!
                this.openCart = false;
            } else {
                this.openCart = true;
                this.cart[0].CartID = message.cartId;
            }
            
        })
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
                this.orders = await this.myOrdersService.getLastOrderByUser(uuid);        }
              catch (err) {
                  this.orders = null;
                //   this.notify.error(err);
              }
          
              // GETS LAST CART (OPEN OR CLOSED)
            try {
                this.cart = await this.myCartService.getLastCartByUser(uuid);   
            } catch (err) {
                this.cart = null;
                // this.notify.error(err);
            }
          
              // CHECKS IF THE LAST CART IS OPEN (no match for last order)
              // first if -> for first time user, when there are no orders or carts in db. otherwise it crashes
            if (this.orders === null || this.cart === null) {
                this.openCart = false;
            } else if (this.orders[0].CartID === this.cart[0].CartID) {
                this.openCart = false
            } else {
                this.openCart = true
            }    
        }

    openDialog() {
        const dialogRef = this.dialog.open(OrderUnitsDialogComponent,  {
            data: {
                name: this.product.ProductName,
                imageName: this.product.imageName,
                quantity: this.quantity
            }
        });
        dialogRef.afterClosed().subscribe(async result => {
            this.quantity = result;
            if (this.quantity) {
                this.addToCart();
            }
        });
    }

    async addToCart() {
        if (this.openCart === false) { // if there is no open cart -> create a new cart
            this.newCart.UserUUID = this.user.uuid;
            this.newCart.Date = new Date().toString();
            try {
                    await this.myCartService.addCart(this.newCart);
                    // this.notify.success("A new cart was created.");
                }
                catch(err) {
                    // this.notify.error(err);
            }
            try {       // then bring in the new created cart. is there a shorter way than to resend request??? maybe with insertId???
                // still sends the old cart's id beacuse the redux doesn;t render!!!!!!
                    this.cart = await this.myCartService.getLastCartByUser(this.user.uuid);   
                } catch (err) {
                    // this.notify.error(err);
            }
        }

        this.item.ProductID = this.product.ProductID;
        this.item.TotalPrice = this.product.UnitPrice*this.quantity;
        this.item.Quantity = this.quantity;
        this.item.CartID = this.cart[0].CartID;
        try {
            const addedItem = await this.myItemService.addCartItem(this.item);
            // this.notify.success("Product has been added to your cart.");
            this.item.ItemID = addedItem.ItemID;
            this.myItemService.addToMenuCart(this.item, this.product.ProductName);
        }
        catch(err) {
            // this.notify.error(err);
        }
    }

    editProduct() {
        this.myProductService.adminProductUpdate(this.product);
    }
    
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
