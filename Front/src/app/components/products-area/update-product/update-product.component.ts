import { ProductsService } from './../../../services/products.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import CategoryModel from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

    public product = new ProductModel();
    private subscription: Subscription;
    public categories: CategoryModel[];
    public updateRequest: boolean;

    public productForm: FormGroup;
    public nameControl: FormControl;
    public priceControl: FormControl;
    public imageControl: FormControl;
    public categoryControl: FormControl;

    constructor(
        private myActivatedRoute: ActivatedRoute,
        private myProductsService: ProductsService,
        private myCategoryService: CategoryService,
        private notify: NotifyService,
        private myRouter: Router) {

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

        
        this.subscription = this.myProductsService.getCartObservable().subscribe(product => {
            if (product.product.ProductID>0) {
                // UPDATE FORM
                this.nameControl.setValue(product.product.ProductName);
                this.priceControl.setValue(product.product.UnitPrice);
                this.product.ProductID = product.product.ProductID;
                this.product.CategoryID = product.product.CategoryID;
                this.product.ProductName = product.product.ProductName;
                this.updateRequest = true;
            } else {
               this.updateRequest = false;
            }
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

    public async update() {
        try {
            this.product.ProductName = this.nameControl.value;
            this.product.UnitPrice = this.priceControl.value;
            this.product.CategoryID = this.categoryControl.value;
            await this.myProductsService.updateProduct(this.product);
            // this.notify.success("Product has been updated.");
            this.myProductsService.adminProductUpdate(this.product);
        }
        catch(err) {
            // this.notify.error(err);
        }
    }

}
