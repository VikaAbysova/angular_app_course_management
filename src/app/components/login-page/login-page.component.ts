import { SpinnerService } from './../../services/spinner.service';
import { Credentials } from './../../interfaces/credentials.interface';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

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
    private spinnerService: SpinnerService
  ) {}

  onLogin() {
    if (this.credentials.login && this.credentials.password) {
      this.spinnerService.showLoading(true);
      this.authService.login(this.credentials);
      this.authService.isAuth = true;
      this.router.navigate(['/courses']);
    }
  }
}
