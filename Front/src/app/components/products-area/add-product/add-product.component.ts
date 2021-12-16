import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from 'src/app/services/category.service';
import CategoryModel from 'src/app/models/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

    public product = new ProductModel();
    public categories: CategoryModel[];

    public productForm: FormGroup;
    public nameControl: FormControl;
    public priceControl: FormControl;
    public imageControl: FormControl;
    public categoryControl: FormControl;

    constructor(
        private myProductsService: ProductsService,
        private myRouter: Router,
        private notify: NotifyService,
        private myCategoryService: CategoryService) {
            this.nameControl = new FormControl(null, [Validators.required, Validators.pattern("^[A-Z].*$")]);
            this.priceControl = new FormControl(null, Validators.required);
            this.categoryControl = new FormControl(null, Validators.required);
            this.imageControl = new FormControl();
            this.productForm = new FormGroup({
                nameControl: this.nameControl,
                priceControl: this.priceControl,
                categoryControl: this.categoryControl,
                imageControl: this.imageControl
        });

         }



    async ngOnInit() {
        try {
            this.categories = await this.myCategoryService.getAllCategories();
        }
        catch (err) {
            // this.notify.error(err);
        }
    }

    public saveImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    public async send() {
        try {
            this.product.ProductName = this.nameControl.value;
            this.product.UnitPrice = this.priceControl.value;
            this.product.CategoryID = this.categoryControl.value;
            const newProduct = await this.myProductsService.addProduct(this.product);
            // this.notify.success("Product has been added.");
            this.myProductsService.adminProductUpdate(newProduct);
        }
        catch(err) {
            // this.notify.error(err);
        }
    }
    
}
