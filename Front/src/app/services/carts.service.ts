import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import CartModel from '../models/cart.model';
import { cartAddedAction, cartDeletedAction, cartsDownloadedAction } from '../redux/cart-state';
import store from '../redux/store';
import { TimezoneService } from './timezone.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient, private tz_helper: TimezoneService) { }

  cartUpdate(cartClosed: boolean, totalCart: number, cartId: number) {
    this.subject.next({
        cartClosed: cartClosed,
        totalCart: totalCart,
        cartId: cartId
    });
  }

  getCartOpenObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  public async getLastCartByUser(uuid: string) {   // NEVER FROM REDUX
    // if (store.getState().cartState.carts.length === 0) {
        const carts = await this.http.get<CartModel[]>(environment.cartsUrl + "user/" + uuid).toPromise();
        // Iterate over all employees and convert timezone to my local timezone
      //   for (let order of orders) {
      //     order.Date = this.tz_helper.convertTZ(order.Date).toString(); 
      // }
        store.dispatch(cartsDownloadedAction(carts));
    // }
        // NEED TO UNDERSTAND IF THAT IS CORRECT
  // const carts = store.getState().cartState.carts.filter(p => p.UserUUID === uuid);
  return carts;
  }

    // // Delete cart: 
    public async deleteCart(id: number) {
        await this.http.delete(environment.cartsUrl + id).toPromise();
        store.dispatch(cartDeletedAction(id));
    }

    
   // Add cart: 
    public async addCart(cart: CartModel) {
      const myFormData: FormData = CartModel.convertToFormData(cart);
      const addedCart = await this.http.post<CartModel>(environment.cartsUrl, myFormData).toPromise();
      const resultToStore: CartModel[] = [];
      resultToStore.push(addedCart);
      store.dispatch(cartAddedAction(resultToStore));
      return resultToStore;
  }

}
