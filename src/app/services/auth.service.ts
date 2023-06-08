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
    token: '123victory',
  };

  login() {
    localStorage.setItem('firstName', this.userInfo.firstName);
    localStorage.setItem('token', this.userInfo.token);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return true;
  }

  getUserInfo() {
    return localStorage.getItem('firstName');
  }
}
