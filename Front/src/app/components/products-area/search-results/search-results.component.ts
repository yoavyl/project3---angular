import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public products: ProductModel[];
  public leftArrow: boolean = true;
  public rightArrow: boolean = false;

  constructor(
    private myActivatedRoute: ActivatedRoute,
    private notify: NotifyService,
    private myProductsService: ProductsService) { }

  async ngOnInit() {
    try {
      this.myActivatedRoute.queryParams.subscribe(async params => {
        this.products = await this.myProductsService.getProductsBySearch(params.q);      
      });
    } catch (err) {
      // this.notify.error(err);
    }
    // if (!this.products) {
      // this.products = undefined;
    // }
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
