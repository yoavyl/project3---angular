import { Component, OnInit } from '@angular/core';
import OrderModel from 'src/app/models/order.model';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-submitted',
  templateUrl: './orders-submitted.component.html',
  styleUrls: ['./orders-submitted.component.css']
})
export class OrdersSubmittedComponent implements OnInit {
  
  public ordersCount: {count: number}[];
  public submitted : number;

  constructor(private myOrdersService: OrderService, private notify: NotifyService) { }

  async ngOnInit() {
      try {
          this.ordersCount = await this.myOrdersService.countOrders();
          this.submitted = this.ordersCount[0].count;
      }
      catch (err) {
          // this.notify.error(err);
      }
  }
}