import {
  selectIsAuth,
  selectToken,
} from './../store/auth-service/auth.selectors';
import { Store } from '@ngrx/store';
import { Token } from './../interfaces/token.interface';
import { Credentials } from './../interfaces/credentials.interface';
import { environment } from '../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, map, switchMap } from 'rxjs';
import { HandleErrorService } from './handle-error.service';
import { UserEntity } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HandleErrorService {
  // isAuth: boolean;
  // token: Token;
  // loginValue$ = new Subject<string>();
  token$: Observable<Token>;

  constructor(private http: HttpClient, private store: Store) {
    super();
  }

  login(credentials: Credentials) {
    return this.http
      .post<Token>(`${environment.baseUrl}/auth/login`, credentials)
      .pipe(
        catchError(this.handleError),
        tap((res: Token) => {
          localStorage.setItem('token', res.token),
            (this.token$ = this.store.select(selectToken));
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return this.store.select(selectIsAuth);
  }

  getUserInfo(): Observable<string> {
    return this.token$.pipe(
      switchMap((token) =>
        this.http.post<UserEntity>(
          `${environment.baseUrl}/auth/userinfo`,
          token
        )
      ),
      catchError(this.handleError),
      map((userInfo) => userInfo.login)
    );
  }
}
