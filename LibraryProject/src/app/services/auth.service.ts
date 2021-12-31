import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/user';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  api_key = "AIzaSyCMsTZ9HQ_Mi-obIDVZyvHjJmPg6w-u2ac"
  user = new BehaviorSubject<User>(null);
  
  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleAuthentication(response.email,response.localId,response.idToken, +response.expiresIn)       
      })
    )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {

        this.handleAuthentication(response.email,response.localId,response.idToken, +response.expiresIn)
                
      })
    )
  }

  autoLogin(){   // sayfa yenilendiginde giris yapılmıs olan user bilgileriyle login durumunun korunmasi
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)

    );

    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number){


    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))

        const user = new User(
          email,
          userId,
          token,
          expirationDate
        );

        this.user.next(user);
        localStorage.setItem("user",JSON.stringify(user)); // user obje tipinde oldugu icin bunun stringify metoduyla stringe cevirdik.

  }

  logout(){
    this.user.next(null);
    localStorage.removeItem("user");  // cikis yapildiginde localstorage'den user bilgilerinin silinmesi
    this.router.navigate(['/auth']);
  }

  
  
}
