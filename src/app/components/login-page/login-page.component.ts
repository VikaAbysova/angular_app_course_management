import { login } from './../../store/auth-service/auth.actions';
import { SpinnerService } from './../../services/spinner.service';
import { Credentials } from './../../interfaces/credentials.interface';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form: FormGroup;

  constructor(
    public authService: AuthService,
    private spinnerService: SpinnerService,
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onLogin() {
    if (this.form.get('login')?.value && this.form.get('password')?.value) {
      const credentials: Credentials = {
        login: this.form.get('login')?.value,
        password: this.form.get('password')?.value,
      };
      this.store.dispatch(login({ credentials }));
    }
    this.spinnerService.showLoading(true);
  }

  showErrorText(controlName: string): string | void {
    const controlField = this.form.get(controlName);
    if (controlField?.hasError('required')) {
      return `${controlName} shouldn't be empty`;
    }
  }
}
