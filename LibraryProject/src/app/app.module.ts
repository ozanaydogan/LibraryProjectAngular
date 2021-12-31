import {  NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookcategoriesComponent } from './bookcategories/bookcategories.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookFilterPipe } from './pipes/book-filter.pipe';
import { BookCreateComponent } from './book-create/book-create.component';
import { AlertifyService } from './services/alertify.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthInterceptor } from './services/auth.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { MyBooksComponent } from './my-books/my-books.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    BookcategoriesComponent,
    BooksComponent,
    BookComponent,
    BookFilterPipe,
    BookCreateComponent,
    BookDetailsComponent,
    CategoryCreateComponent,
    AlertComponent,
    LoadingComponent,
    MyBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
    
  bootstrap: [AppComponent]
})
export class AppModule{

}
