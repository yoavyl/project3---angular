import { Component, Input } from '@angular/core';
import CategoryModel from 'src/app/models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {

  @Input()
    public category: CategoryModel;

}
