import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  onLogout() {
    console.log(this.authService.getUserInfo());
    this.authService.logout();
    this.authService.isAuth = false;
    this.router.navigate(['login']);
  }
}
