import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import ProductModel from '../models/product.model';
import { productAddedAction, productDeletedAction, productsDownloadedAction, productUpdatedAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private subject = new Subject<any>();

    constructor(private http: HttpClient) { }

    
  // observable function
  adminProductUpdate(product: ProductModel) {
    this.subject.next({
        product: product,
    });
  }

  getCartObservable(): Observable<any> {
    return this.subject.asObservable();
  }

    // Get all products: 
    public async getAllProducts() {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        return store.getState().productsState.products;
    }

    // Get produts per category: 
    public async getProductsPerCategory(id: number) {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.categoriesUrl + id).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        const products = store.getState().productsState.products.filter(p => p.CategoryID === id);
        return products;
    }

    // Get one product: 
    public async getOneProduct(id: number) {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl + id).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        const product = store.getState().productsState.products.find(p => p.ProductID === id);
        return product;
    }

    // Get products per query: // lower/upper case insensitive
    public async getProductsBySearch(query: string) {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl + "search/" + query).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        const product = store.getState().productsState.products.filter(p => p.ProductName.toLowerCase().includes(query.toLowerCase()));
        return product;
    }

    // Add product: 
    public async addProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, myFormData).toPromise();
        store.dispatch(productAddedAction(addedProduct));
        return addedProduct;
    }

    // Update product: 
    public async updateProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const updatedProduct = await this.http.put<ProductModel>(environment.productsUrl + product.ProductID, myFormData).toPromise();
        store.dispatch(productUpdatedAction(updatedProduct));
        return updatedProduct;
    }

    // Delete product: 
    // public async deleteProduct(id: number) {
    //     await this.http.delete(environment.productsUrl + id).toPromise();
    //     store.dispatch(productDeletedAction(id));
    // }

}
