import { NgModule } from '@angular/core';
import { AuthGuard } from '../app/guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'courses',
    component: CoursesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/:id',
    loadChildren: () =>
      import('./components/add-course-page/add-course-page.module').then(
        (m) => m.AddCoursePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/new',
    loadChildren: () =>
      import('./components/add-course-page/add-course-page.module').then(
        (m) => m.AddCoursePageModule
      ),
    canActivate: [AuthGuard],
  },

  { path: 'not-found', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
