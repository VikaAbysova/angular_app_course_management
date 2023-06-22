import { Token } from './../interfaces/token.interface';
import { Credentials } from './../interfaces/credentials.interface';
import { environment } from '../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject } from 'rxjs';
import { HandleErrorService } from './handle-error.service';
import { UserEntity } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HandleErrorService {
  isAuth: boolean;
  token: Token;
  loginValue$ = new Subject<string>();

  constructor(private http: HttpClient) {
    super();
  }

  login(credentials: Credentials): void {
    this.http
      .post<Token>(`${environment.baseUrl}/auth/login`, credentials)
      .pipe(catchError(this.handleError))
      .subscribe((res: Token) => {
        localStorage.setItem('token', res.token), (this.token = res);
        this.getUserInfo();
      });
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return this.isAuth;
  }

  getUserInfo(): void {
    this.http
      .post<UserEntity>(`${environment.baseUrl}/auth/userinfo`, this.token)
      .pipe(catchError(this.handleError))
      .subscribe((userInfo) => this.loginValue$.next(userInfo.login));
  }
}
