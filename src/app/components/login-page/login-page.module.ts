import { LoginPageRoutingModule } from '../../login-page-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, FormsModule, LoginPageRoutingModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
