import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  title1 : String = "KİTAPLARIM" ;

  books: Book[] = [];
  filteredBooks: Book[] = [];
  filterText: string ="";
  error: any;
  userId: string;
  bookList: string[] = [];
  myBooks: Book[] = [];

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
          
          this.bookService.getList(this.userId).subscribe(data => {
          this.bookList = data;
          
          this.bookList.map(element => {
          this.myBooks.push(this.books.find(k => k.id == element)) ;
          this.filteredBooks = this.myBooks;  
          });

          });
          
        }, error => {
          this.error = error;
        });
      });
    })
    console.log(this.myBooks);
  }

  getButtonstate(book: Book) {
    return this.bookList.findIndex(m=>m === book.id) > -1
  }


  onInputChange(){
    this.filteredBooks = this.filterText? this.myBooks.filter(m=> m.title.toLowerCase().indexOf(this.filterText)!== -1 || m.description.toLowerCase().indexOf(this.filterText)!== -1): this.myBooks;
  }

  addToList($event: any, book: Book) {
    if($event.target.classList.contains('btn-danger')) {
      $event.target.innerText = "item has been removed";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-info');

      this.bookService
      .removeFromList({ userId: this.userId, bookId: book.id })
      .subscribe(() =>  this.alertify.error(book.title + ' listeden çıkarıldı.'));
    } 
  }
}
