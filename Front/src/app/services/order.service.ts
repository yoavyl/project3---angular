import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import OrderModel from '../models/order.model';
import { orderAddedAction, ordersDownloadedAction } from '../redux/order-state';
import store from '../redux/store';
import { TimezoneService } from './timezone.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private tz_helper: TimezoneService) { }

  public async getOrderFile(fileName: string) {
        return await this.http.get(environment.ordersPDFUrl + fileName, { responseType: 'blob'}).toPromise();           
  }

    // Get all orders: 
    public async getAllOrdersByOrderIdDesc() {
        if (store.getState().orderState.orders.length === 0) {
            const orders = await this.http.get<OrderModel[]>(environment.ordersUrl).toPromise();           
            store.dispatch(ordersDownloadedAction(orders));

        }
        return store.getState().orderState.orders;
    }

    public async countOrders() {
      // NO REDUX NEEDED - because in real websites multiple users book orders in parallel, 
      // and every time i want to get the most updated information from server 
      const count = await this.http.get<[]>(environment.ordersUrl + "count").toPromise();
      return count;
    }

    public async getFullyBookedDates() { 
      // NO REDUX NEEDED - because in real websites multiple users book orders in parallel, 
      // and every time i want to get the most updated information from server to datepickeer
      const count = await this.http.get<[]>(environment.ordersUrl + "count/dates").toPromise();
      return count;
    }

    // Get carts per user: --> never from redux!!! 
    public async getLastOrderByUser(uuid: string) { // NEVER FROM REDUX
      // if (store.getState().orderState.orders.length === 0) {
        const orders = await this.http.get<OrderModel[]>(environment.ordersUrl + "user/" + uuid).toPromise();
          // Iterate over all employees and convert timezone to my local timezone
        for (let order of orders) {
          order.Date = this.tz_helper.convertTZ(order.Date).toString(); 
        }
          store.dispatch(ordersDownloadedAction(orders));
      // }
          // NEED TO UNDERSTAND IF THAT IS CORRECT
    // const orders = store.getState().orderState.orders.filter(p => p.UserUUID === uuid);
    return orders;
    }
    

    // // Add order: 
    public async addOrder(order: OrderModel) {
      console.log(order);
        const myFormData: FormData = OrderModel.convertToFormData(order);
        console.log(myFormData);
        const addedOrder = await this.http.post<OrderModel>(environment.ordersUrl, myFormData).toPromise();
        store.dispatch(orderAddedAction(addedOrder));
        return addedOrder;
    }

}