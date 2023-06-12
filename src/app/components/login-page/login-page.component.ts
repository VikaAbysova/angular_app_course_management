import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  emailValue: string;
  passwordValue: string;

  constructor(public authService: AuthService, private router: Router){}

  onLogin(){
    this.authService.login();
    if(this.emailValue && this.passwordValue) {
      this.authService.login();
      this.authService.isAuth = true;
      this.router.navigate(['/courses']);
    }
    return;
  }
}
