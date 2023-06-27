import { filter } from 'rxjs/operators';
import { selectIsAuth } from './../../store/auth-service/auth.selectors';
import { login, getUserInfo } from './../../store/auth-service/auth.actions';
import { SpinnerService } from './../../services/spinner.service';
import { Credentials } from './../../interfaces/credentials.interface';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  credentials: Credentials = {
    login: '',
    password: '',
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
    private store: Store
  ) {}

  onLogin() {
    if (this.credentials.login && this.credentials.password) {
      this.spinnerService.showLoading(true);
      this.store.dispatch(login({ credentials: this.credentials }));
      this.store
        .select(selectIsAuth)
        .pipe(filter((isAuth) => isAuth === true))
        .subscribe((isAuth) => {
          if (isAuth) {
            this.store.dispatch(getUserInfo());
            this.router.navigate(['/courses']);
          }
        });
    }
  }
}
