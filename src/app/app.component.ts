import { SpinnerService } from './services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading: boolean;
  constructor(
    public authService: AuthService,
    public spinnerService: SpinnerService
  ) {}
  ngOnInit(): void {
    this.spinnerService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }
}
