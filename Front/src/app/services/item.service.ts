import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import ItemModel from '../models/item.model';
import { itemAddedAction, itemDeletedAction, itemsDownloadedAction, itemsofCartDeletedAction } from '../redux/item-state';
import store from '../redux/store';
import { TimezoneService } from './timezone.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private subject = new Subject<any>();


  constructor(private http: HttpClient, private tz_helper: TimezoneService) { }

  addToMenuCart(item: ItemModel, name: string) {
    this.subject.next({
        item: item,
        name: name
    });
  }

  getCartObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  public totalCartPerUser(items: ItemModel[]): number {
    let totalCart = 0;
    if (items) {
        for (let item of items) {
            totalCart += item.TotalPrice;
        }
    }
    return totalCart;
  }

  // Get carts per user: 
  public async getOpenCartItems(CartID: number) {
    if (store.getState().itemState.items.filter(p => p.CartID === CartID).length === 0) {
        const items = await this.http.get<ItemModel[]>(environment.itemsUrl  + CartID).toPromise();
        store.dispatch(itemsDownloadedAction(items));
    }
    // NEED TO UNDERSTAND IF THAT IS CORRECT
    const items = store.getState().itemState.items.filter(p => p.CartID === CartID);
    return items;
  }

    // // Delete item: 
  public async deleteItem(id: number) {
    await this.http.delete(environment.itemsUrl + id).toPromise();
    store.dispatch(itemDeletedAction(id));
  }

    // // Delete all items of a carts: 
  public async deleteAllItemsOfCart(cartId: number) {
    await this.http.delete(environment.itemsUrl + "all/" + cartId).toPromise();
    store.dispatch(itemsofCartDeletedAction(cartId)); // I added this action, I hope it's fine
  }

    // Add item: 
    public async addCartItem(item: ItemModel) {
      const myFormData: FormData = ItemModel.convertToFormData(item);
      const addedItem = await this.http.post<ItemModel>(environment.itemsUrl, myFormData).toPromise();
      store.dispatch(itemAddedAction(addedItem));
      return addedItem;
  }

}
