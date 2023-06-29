import { selectIsAuth } from './../store/auth-service/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(): Observable<UrlTree | boolean> {
    return this.store.select(selectIsAuth).pipe(
      map((isAuth) => {
        if (isAuth) {
          return true;
        }
        this.authService.logout();
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
