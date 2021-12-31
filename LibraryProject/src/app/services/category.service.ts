import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../models/categories';

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
  
    url = "http://localhost:3000/categories";
    url_firebase = "https://library-app-project-812af-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url_firebase + 'categories.json').pipe(

      map(response => {
        const categories: Category[] = [];

        for(const key in response) {
          categories.push({...response[key], id: key});
        }

        return categories;

      })

    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url_firebase + 'categories.json', category);
  }
  
  }