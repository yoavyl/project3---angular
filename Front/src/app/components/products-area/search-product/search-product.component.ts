import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {

  public searchInput: string;

  constructor(
    private router: Router,
    ) { }

  async search(){
    this.router.navigateByUrl("products/search?q=" + this.searchInput); 
  }

}
