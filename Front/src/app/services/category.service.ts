import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CategoryModel from '../models/category.model';
import { categorysDownloadedAction } from '../redux/category-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

    // Get all categories: 
    public async getAllCategories() {
        if (store.getState().categoryState.categories.length === 0) {
            const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();           

            store.dispatch(categorysDownloadedAction(categories));
        }
        return store.getState().categoryState.categories;
    }
}