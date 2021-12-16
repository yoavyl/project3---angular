import { Component, Input } from '@angular/core';
import CartModel from 'src/app/models/cart.model';
import ItemModel from 'src/app/models/item.model';
import UserModel from 'src/app/models/user.model';
import { CartsService } from 'src/app/services/carts.service';
import { ItemService } from 'src/app/services/item.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  @Input()
  public item: ItemModel;

  @Input()
  public items: ItemModel[];

  @Input()
  public cart: CartModel[];

  public imageUrl = environment.productImagesUrl;

  @Input()
  searchQuery: string = '';

  @Input()
  deleteItem: Function;

  @Input()
  getLastCart: Function;

  @Input()
  user: UserModel;

  constructor(private myItemService: ItemService,
    private myCartService: CartsService,
    private notify: NotifyService) {}

}
