import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksComponent } from './books/books.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [

 /*{ path: 'first-component', component: HosgeldinizComponent }*/
   { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
   { path : '', redirectTo: "books",pathMatch: 'full'},
   { path: 'books/bookcategories/:type', component:  BooksComponent , canActivate: [AuthGuard]},
   { path: 'books/mybooks', component: MyBooksComponent , canActivate: [AuthGuard] },
   { path: 'books/create', component: BookCreateComponent , canActivate: [AuthGuard] },
   { path: 'categories/create', component: CategoryCreateComponent , canActivate: [AuthGuard] },
   { path: 'books/:type', component: BookDetailsComponent , canActivate: [AuthGuard] },
   { path: 'auth', component: AuthComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
