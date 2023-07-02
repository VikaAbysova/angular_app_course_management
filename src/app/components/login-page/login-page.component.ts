import { login } from './../../store/auth-service/auth.actions';
import { SpinnerService } from './../../services/spinner.service';
import { Credentials } from './../../interfaces/credentials.interface';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  credentials: Credentials = {
    login: 'Morales',
    password: 'id',
  };

  form: FormGroup;

  constructor(
    public authService: AuthService,
    private spinnerService: SpinnerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  onLogin() {
    // if (this.credentials.login && this.credentials.password) {
    //   this.spinnerService.showLoading(true);
    //   this.store.dispatch(login({ credentials: this.credentials }));
    // }
    this.spinnerService.showLoading(true);
      this.store.dispatch(login({ credentials: this.credentials }));
  }
}
