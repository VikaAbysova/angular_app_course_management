import { LoginPageRoutingModule } from '../../login-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
