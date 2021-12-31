import { Component, OnInit } from '@angular/core';
import { Category } from '../models/categories';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-bookcategories',
  templateUrl: './bookcategories.component.html',
  styleUrls: ['./bookcategories.component.css'],
  providers: [CategoryService]
})
export class BookcategoriesComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category = null;

  constructor(private categoryService : CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data =>{
      console.log(data);
      this.categories = data;
    })
  }

  displayAll = true;

  selectCategory(item?: Category) {
    if(item) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }

}
