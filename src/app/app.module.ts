import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LogoComponent} from './logo/logo.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {CourseComponent} from './course/course.component';
import {CoursesPageComponent} from './courses-page/courses-page.component';
import {NgOptimizedImage} from "@angular/common";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbsComponent,
    CourseComponent,
    CoursesPageComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    FormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
