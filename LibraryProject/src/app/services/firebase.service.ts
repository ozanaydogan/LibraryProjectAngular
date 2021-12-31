import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { User } from '../models/user';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbbooks = '/books'
  private dbUser = '/users'


  bookRef: AngularFireList<Book>
  userRef: AngularFireList<User>


  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth) {
    this.bookRef = db.list(this.dbbooks);
    this.userRef = db.list(this.dbUser);
  }

  getAllBooks(): AngularFireList<Book> {
    return this.bookRef
   }
   getAllUsers(): AngularFireList<User> {
    return this.userRef
   }
   addUser(user: User):any {
    return this.userRef.push(user)
  }
}
