import { FilterCoursesPipe } from './pipes/filter-courses.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadMoreBtnComponent } from './components/load-more-btn/load-more-btn.component';
import { LogoComponent } from './components/logo/logo.component';
import { CoursesSearchComponent } from './components/courses-search/courses-search.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
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
      ],
      providers: [OrderByDatePipe, FilterCoursesPipe],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
