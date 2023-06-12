import { Injectable } from '@angular/core';
import { UserEntity } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: UserEntity = {
    id: '123',
    firstName: 'Victoriya',
    lastName: 'Rainbow',
  };

  isAuth = true;

  login() {
    localStorage.setItem('firstName', this.userInfo.firstName);
    localStorage.setItem('token', '123victory');
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return this.isAuth;
  }

  getUserInfo() {
    return this.userInfo.firstName;
  }
}
