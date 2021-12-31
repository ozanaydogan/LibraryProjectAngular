import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Book } from '../models/book';
import { MyList } from '../models/mylist';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  url = "http://localhost:3000/books";
  url_firebase = "https://library-app-project-812af-default-rtdb.firebaseio.com/";


  constructor(private http: HttpClient) { }


  createBook(book: Book): Observable<Book> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token'
      })
    }

    return this.http.post<Book>(this.url_firebase + "/books.json", book, httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getBooks(type: string): Observable<Book[]> {
    let newUrl = this.url_firebase + "books.json"; // onceden db.json yapisina verileri kaydedip                                     
                                                   // verileri ordan aliyordum, artık firebasede bulunan books.json collection yapisindan verileri çekebiliyorum
    
    return this.http.get<Book[]>(newUrl)
      .pipe(
        map(response => {
          const books: Book[] = [];

          for (const key in response) {
            books.push({ ...response[key], id: key });  //firebase'deki id'nin, book'taki id ye atanmasi 2
          }
          return type == undefined ? books : books.filter(k => k.type == type);

        }),
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  getBookById(type: string): Observable<Book[]> {
    let newUrl = this.url_firebase + "books.json"; // onceden db.json yapisina verileri kaydedip                                     
                                                   // verileri ordan aliyordum, artık firebasede bulunan books.json collection yapisindan verileri çekebiliyorum
    
    return this.http.get<Book[]>(newUrl)
      .pipe(
        map(response => {
          const books: Book[] = [];

          for (const key in response) {
            books.push({ ...response[key], id: key });  //firebase'deki id'nin, book'taki id ye atanmasi 2
          }
          console.log(books[0].id);
          
          return type == undefined ? books : books.filter(k => k.id == type);

        }),
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client yada network
      console.log("error: " + error.error.message);
    } else {
      // backend
      switch (error.status) {
        case 404:
          console.log("not found");
          break;
        case 403:
          console.log("access denied");
          break;
        case 500:
          console.log("interval server");
          break;
        default:
          console.log("bilinmeyen bir hata");
      }
    }
    return throwError("bir hata oluştu.");
  }

  addToMyList(item: MyList): Observable<MyList> {
    return this.http.post<MyList>(this.url_firebase + "/users/" + item.userId + "/list/" + item.bookId + ".json",
    {
      dateAdded: new Date().getTime()
    }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    )
  }

  removeFromList(item: MyList): Observable<MyList> {
    return this.http.delete<MyList>(this.url_firebase + "/users/" + item.userId + "/list/" + item.bookId + ".json")
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      )
  }

  getList(userId: string): Observable<string[]> {
    return this.http.get<string[]>(this.url_firebase + "/users/" + userId + "/list.json")
      .pipe(
        map(response => {
          const books: string[] = [];

          for (const key in response) {
            books.push(key);
          }

          return books;
        }),
        tap(data => console.log(data)),
        catchError(this.handleError)
      )
  }

}
