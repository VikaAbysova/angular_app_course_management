import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginValue: string;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loginValue$.subscribe((userInfo) => {
      this.loginValue = userInfo;
    });
  }

  onLogout() {
    this.authService.logout();
    this.authService.isAuth = false;
    this.router.navigate(['login']);
  }
}
