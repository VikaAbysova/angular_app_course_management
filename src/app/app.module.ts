import { LoginPageModule } from './components/login-page/login-page.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogoComponent} from './components/logo/logo.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {CourseComponent} from './components/course/course.component';
import {CoursesPageComponent} from './components/courses-page/courses-page.component';
import {LoadMoreBtnComponent} from './components/load-more-btn/load-more-btn.component';
import {CoursesSearchComponent} from './components/courses-search/courses-search.component';
import {FreshBorderDirective} from './directives/course-relevance.directive';
import {DurationPipe} from './pipes/duration.pipe';
import {OrderByDatePipe} from './pipes/order-by-date.pipe';
import {FilterCoursesPipe} from './pipes/filter-courses.pipe';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';

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
    DurationPipe,
    OrderByDatePipe,
    FilterCoursesPipe,
    IfAuthenticatedDirective,
  ],
  imports: [BrowserModule, FormsModule, LoginPageModule],
  providers: [OrderByDatePipe, DurationPipe, FilterCoursesPipe],
  bootstrap: [AppComponent],
})
export class AppModule {
}
