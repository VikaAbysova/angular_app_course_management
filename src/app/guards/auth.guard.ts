import { Observable, of, map } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<UrlTree | boolean> {
    return of(this.authService.isAuthenticated()).pipe(
      map((isAuth) => {
        if (isAuth) {
          return true;
        } else {
          this.authService.logout();
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
