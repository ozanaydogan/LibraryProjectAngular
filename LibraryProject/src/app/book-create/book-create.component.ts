import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/categories';
import { AlertifyService } from '../services/alertify.service';
import { BookService } from '../services/book.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  providers: [CategoryService, BookService, AlertifyService]
})
export class BookCreateComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService,
              private bookService: BookService,
              private router: Router,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  createBook(title: any, description: any, imageUrl: any, type: any, author: any) {

    if(title.value === "" || description.value === "" || imageUrl.value === "" || type.value === "" || author.value === ""){
     return this.alertify.error("tum alanlari doldurmalisiniz..");
    }
    

    const book = {
      id: 0,
      title: title.value,
      description:  description.value,
      imageUrl: imageUrl.value,
      type: type.value,
      author : author.value, 
    };

   

    this.bookService.createBook(book).subscribe(data => {
      this.router.navigate(['/books'])
    });

    this.alertify.success("kitap olusturuldu..");

  }

}
