import { Component, Input } from '@angular/core';
import CartModel from 'src/app/models/cart.model';
import ItemModel from 'src/app/models/item.model';
import OrderModel from 'src/app/models/order.model';
import UserModel from 'src/app/models/user.model';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-cart-right',
  templateUrl: './cart-right.component.html',
  styleUrls: ['./cart-right.component.css']
})

export class CartRightComponent {

  @Input()
  public totalCart: number;

  @Input()
  public items: ItemModel[];

  @Input()
  public orders: OrderModel[];

  @Input()
  public user: UserModel;

  @Input()
  public openCart: boolean;

  @Input()
  public cart: CartModel[];

  constructor(private myOrdersService: OrderService, private notify: NotifyService) {}


}
