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

  login() {
    localStorage.setItem('firstName', this.userInfo.firstName);
    localStorage.setItem('token', '123victory');
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return true;
  }

  getUserInfo() {
    return this.userInfo.firstName;
  }
}
