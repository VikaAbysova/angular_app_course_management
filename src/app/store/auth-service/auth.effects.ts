import { Token } from './../../interfaces/token.interface';
import { AuthService } from './../../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginSuccess,
  logout,
  getUserInfo,
  getUserInfoSuccess,
} from './auth.actions';
import { exhaustMap, map, catchError, EMPTY, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((token: Token) => loginSuccess({ token })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => this.authService.logout())
      );
    },
    { dispatch: false }
  );

  userInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserInfo),
      exhaustMap(() =>
        this.authService.getUserInfo().pipe(
          map((login: string) => getUserInfoSuccess({ login })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
