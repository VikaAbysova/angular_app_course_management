import { selectUserInfo } from './../../store/auth-service/auth.selectors';
import { Observable } from 'rxjs';
import { logout } from './../../store/auth-service/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginValue$: Observable<string>;
  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
this.loginValue$ = this.store.select(selectUserInfo)
  }

  onLogout() {
    this.store.dispatch(logout());
    this.router.navigate(['login']);
  }
}
