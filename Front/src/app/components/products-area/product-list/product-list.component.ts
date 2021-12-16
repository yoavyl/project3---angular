import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public products: ProductModel[];
    public leftArrow: boolean = true;
    public rightArrow: boolean = false;


    constructor(private myProductsService: ProductsService, private notify: NotifyService) { }

    async ngOnInit() {
        try {
            this.products = await this.myProductsService.getAllProducts();
        }
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
