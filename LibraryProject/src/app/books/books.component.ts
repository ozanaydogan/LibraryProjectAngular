import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  title1 : String = "KİTAP LİSTESİ" ;

  books: Book[] = [];
  filteredBooks: Book[] = [];
  filterText: string ="";
  error: any;
  userId: string;
  bookList: string[] = [];
  

  constructor(private alertify: AlertifyService, 
              private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.userId = user.id

      this.activatedRoute.params.subscribe(params => {
        this.bookService.getBooks(params["type"]).subscribe(data => {
          this.books = data;
          this.filteredBooks = this.books;
          
          this.bookService.getList(this.userId).subscribe(data => {
            this.bookList = data;
            console.log(this.bookList);
          });

        }, error => {
          this.error = error;
        });
      });
    })
    
  }

  getButtonstate(book: Book) {
    return this.bookList.findIndex(m=>m === book.id) > -1
  }


  onInputChange(){
    this.filteredBooks = this.filterText? this.books.filter(m=> m.title.toLowerCase().indexOf(this.filterText)!== -1 || m.description.toLowerCase().indexOf(this.filterText)!== -1): this.books;
  }

  addToList($event: any, book: Book) {
    if($event.target.classList.contains('btn-success')) {
      $event.target.innerText = "Remove from list";
      $event.target.classList.remove('btn-success');
      $event.target.classList.add('btn-danger');

      this.bookService
        .addToMyList({ userId: this.userId, bookId: book.id })
        .subscribe(() => this.alertify.success(book.title + ' listene eklendi'))


    } else {
      $event.target.innerText = "Add to list";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-success');

      this.bookService
        .removeFromList({ userId: this.userId, bookId: book.id })
        .subscribe(() =>  this.alertify.error(book.title + ' listeden çıkarıldı.'));     
    
    }
  }
  
}
