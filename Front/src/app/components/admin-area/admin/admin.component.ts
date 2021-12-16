import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public products: ProductModel[];
  public addRequest: boolean = false;
  public product = new ProductModel();
  public leftArrow: boolean = true;
  public rightArrow: boolean = false;

  private subscriptionAdd: Subscription;
  // private subscriptionUpdate: Subscription;

  constructor(private myProductsService: ProductsService, private notify: NotifyService) {
    
    this.subscriptionAdd = this.myProductsService.getCartObservable().subscribe(product => {
      if (product.product.ProductID>0) {
          this.addRequest = false;
          const productToPush = new ProductModel();
          productToPush.ProductName = product.product.ProductName;
          productToPush.CategoryID = product.product.CategoryID;
          productToPush.UnitPrice = product.product.UnitPrice;
          productToPush.ProductID = product.product.ProductID;
          productToPush.imageName = product.product.ProductID + ".jpg"
          const index = this.products.findIndex( p => p.ProductID === product.product.ProductID);
          if (index >= 0) {
            this.products[index] = productToPush;
          } else {
            this.products.push(productToPush);
          }
      } else {
        this.addRequest = !this.addRequest
      }
    });

   }

  async ngOnInit() {
      try {
          this.products = await this.myProductsService.getAllProducts();
      }
      catch (err) {
          this.notify.error(err);
      }
  }

  public add() {
    this.product.ProductID = 0;
    this.myProductsService.adminProductUpdate(this.product);
  }

  public left() {
    this.leftArrow = false;
    this.rightArrow = true;
  }

  public right() {
      this.leftArrow = true;
      this.rightArrow = false;
  }


}
