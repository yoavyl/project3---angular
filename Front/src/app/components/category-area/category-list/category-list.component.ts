import { Component, OnInit } from '@angular/core';
import CategoryModel from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories: CategoryModel[];

    constructor(private myCategoryService: CategoryService, private notify: NotifyService) { }

    async ngOnInit() {
        try {
            this.categories = await this.myCategoryService.getAllCategories();
        }
        catch (err) {
            // this.notify.error(err);
        }
    }

}
