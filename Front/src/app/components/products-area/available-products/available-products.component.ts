import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrls: ['./available-products.component.css']
})
export class AvailableProductsComponent implements OnInit {

  public products: ProductModel[];
  public available : number;

  constructor(private myProductsService: ProductsService, private notify: NotifyService) { }

  async ngOnInit() {
      try {
          this.products = await this.myProductsService.getAllProducts();
          this.available = this.products.length;
      }
      catch (err) {
          // this.notify.error(err);
      }
  }
}
