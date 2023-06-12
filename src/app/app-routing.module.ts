import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { AddCoursePageComponent } from './components/add-course-page/add-course-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesPageComponent },
  { path: 'courses/:id', component: AddCoursePageComponent },
  { path: 'courses/new', component: AddCoursePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
