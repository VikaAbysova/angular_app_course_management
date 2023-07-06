import { CourseEffects } from './store/course/course.effects';
import { CoursesEffects } from './store/courses/courses.effects';
import { AuthEffects } from './store/auth-service/auth.effects';
import { authReducer } from './store/auth-service/auth.reducer';
import { NgModule, isDevMode } from '@angular/core';
import { DurationPipe } from './pipes/duration.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors/index.interceptor';


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
import { SpinnerAnimationComponent } from './components/spinner-animation/spinner-animation.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { coursesReducer } from './store/courses/courses.reducer';
import { courseReducer } from './store/course/course.reducer';
import { TagInputModule } from 'ngx-chips';

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
    SpinnerAnimationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TagInputModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      courses: coursesReducer,
      course: courseReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffects, CoursesEffects, CourseEffects]),
  ],
  providers: [DurationPipe, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
