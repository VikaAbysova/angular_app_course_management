import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { AddCoursePageModule } from './components/add-course-page/add-course-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginPageModule } from './components/login-page/login-page.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { LoadMoreBtnComponent } from './components/load-more-btn/load-more-btn.component';
import { CoursesSearchComponent } from './components/courses-search/courses-search.component';
import { FreshBorderDirective } from './directives/course-relevance.directive';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { FilterCoursesPipe } from './pipes/filter-courses.pipe';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';

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
    OrderByDatePipe,
    FilterCoursesPipe,
    IfAuthenticatedDirective,
    ErrorPageComponent,
  ],
  imports: [BrowserModule, FormsModule, LoginPageModule, AddCoursePageModule, AppRoutingModule],
  providers: [OrderByDatePipe, FilterCoursesPipe, DurationPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
