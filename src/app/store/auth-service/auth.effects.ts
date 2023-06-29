import { Router } from '@angular/router';
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
import { exhaustMap, map, catchError, EMPTY, tap, switchMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      exhaustMap(({ credentials }) =>
        this.authService
          .login(credentials)
          .pipe(
            switchMap((token: Token) =>
              of(loginSuccess({ token }), getUserInfo())
            )
          )
      ),
      catchError(() => EMPTY)
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
          tap(
            () => (
              this.router.navigate(['/courses']),
              this.spinnerService.showLoading(false)
            )
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}
}
