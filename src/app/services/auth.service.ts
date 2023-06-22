import { Token } from './../interfaces/token.interface';
import { Credentials } from './../interfaces/credentials.interface';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEntity } from '../interfaces/user.interface';
import { catchError, Observable, map } from 'rxjs';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HandleErrorService {
  isAuth: boolean;
  token: Token;
  userLogin: string;

  constructor(private http: HttpClient) {
    super();
  }

  login(credentials: Credentials): void {
    this.http
      .post<Token>(`${environment.baseUrl}/auth/login`, credentials)
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        localStorage.setItem('token', res.token),
          (this.token = res),
          this.getUserInfo().subscribe((login) => (this.userLogin = login));
      });
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return this.isAuth;
  }

  getUserInfo(): Observable<string> {
    return this.http
      .post<UserEntity>(`${environment.baseUrl}/auth/userinfo`, this.token)
      .pipe(
        catchError(this.handleError),
        map((userInfo) => userInfo.login)
      );
  }
}
