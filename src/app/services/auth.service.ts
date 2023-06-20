import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEntity } from '../interfaces/user.interface';
import { catchError } from 'rxjs';
import { HandleErrorService } from './handle-error.service';
import { USERS_URL } from '../constants/urls.consts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean;

  constructor(
    private http: HttpClient,
    private errorService: HandleErrorService
  ) {}

  login() {
    this.http
      .get<UserEntity[]>(USERS_URL, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError))
      .subscribe((response: HttpResponse<UserEntity[]>) => {
        if (response.ok && response.body?.length) {
          const user = response.body[1];
          const { first } = user.name;
          const token = user.fakeToken;
          localStorage.setItem('firstName', first);
          localStorage.setItem('token', token);
        }
      });
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return this.isAuth;
  }

  getUserInfo() {
    return localStorage.getItem('firstName');
  }
}
