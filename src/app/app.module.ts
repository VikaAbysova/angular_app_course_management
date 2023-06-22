import { NgModule } from '@angular/core';
import { DurationPipe } from './pipes/duration.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { LoginPageModule } from './components/login-page/login-page.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors/index.interceptor';
// import { LoginPageComponent } from './components/login-page/login-page.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { LoadMoreBtnComponent } from './components/load-more-btn/load-more-btn.component';
import { CoursesSearchComponent } from './components/courses-search/courses-search.component';
import { FreshBorderDirective } from './directives/course-relevance.directive';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbsComponent,
    CourseComponent,
    CoursesPageComponent,
    LoadMoreBtnComponent,
    CoursesSearchComponent,
    FreshBorderDirective,
    IfAuthenticatedDirective,
    NotFoundPageComponent,
    // LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LoginPageModule
  ],
  providers: [DurationPipe, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
