import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-per-category',
  templateUrl: './products-per-category.component.html',
  styleUrls: ['./products-per-category.component.css']
})
export class ProductsPerCategoryComponent implements OnInit {

  public products: ProductModel[];
  public leftArrow: boolean = true;
  public rightArrow: boolean = false;

    constructor( private myActivatedRoute: ActivatedRoute, private router: Router, private myProductsService: ProductsService, private notify: NotifyService) {    }

    async ngOnInit() {
        try {
          const id = +this.myActivatedRoute.snapshot.params.id; // Take a route parameter named id.
          this.products = await this.myProductsService.getProductsPerCategory(id);        }
        catch (err) {
            // this.notify.error(err);
        }   
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
