import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean| UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.createUrlTree(['/login']);
      return false;
    }
  }
}
