import { coursesList } from './../../mocks/courses.mock';
import { Course } from 'src/app/interfaces/course.interface';
import { FilterCoursesPipe } from './../../pipes/filter-courses.pipe';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSearchComponent } from './courses-search.component';
import { NO_ERRORS_SCHEMA, DebugElement, Component } from '@angular/core';

describe('CoursesSearchComponent', () => {
  let component: CoursesSearchComponent;
  let fixture: ComponentFixture<CoursesSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesSearchComponent],
      imports: [FormsModule],
      providers: [FilterCoursesPipe],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CoursesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update input value when change searchCourse value', async () => {
    component.searchCourse = 'test value';
    fixture.detectChanges();
    await fixture.whenStable();
    const inputElement = fixture.debugElement.query(By.css('.input-search'));
    expect(inputElement.nativeElement.value).toBe('test value');
  });

  it('should update searchCourse value when change input value', () => {
    const inputElement = fixture.debugElement.query(By.css('.input-search'));
    inputElement.nativeElement.value = 'test value';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(component.searchCourse).toBe('test value');
  });

  it('should called function when button clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-search'));
    expect(button.nativeElement.textContent).toContain('Search');
    spyOn(component, 'searchClick');
    button.nativeElement.click();
    expect(component.searchClick).toHaveBeenCalled();
  });

  it('should display input value in console log when change input value', () => {
    const inputElement: DebugElement = fixture.debugElement.query(
      By.css('.input-search')
    );
    const button = fixture.debugElement.query(By.css('.btn-search'));
    spyOn(console, 'log');
    inputElement.nativeElement.value = 'test value';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    button.nativeElement.click();
    expect(console.log).toHaveBeenCalledWith('test value');
  });
});

describe('Courses-Search. Test-host approach', () => {
  let hostComponent: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  @Component({
    template: `
      <app-courses-search
        (updateCourses)="applyFilter($event)"
      ></app-courses-search>
    `,
  })
  class HostComponent {
    courses: Course[] = coursesList;
    applyFilter(filteredCourses: Course[]): void {
      this.courses = filteredCourses;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesSearchComponent, HostComponent],
      imports: [FormsModule],
      providers: [FilterCoursesPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit updateCourses event when Search button clicked', () => {
    const inputElement: DebugElement = fixture.debugElement.query(
      By.css('.input-search')
    );
    const button = fixture.debugElement.query(By.css('.btn-search'));
    inputElement.nativeElement.value = 'course 4';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    const spyEmit = spyOn(hostComponent, 'applyFilter');
    button.nativeElement.click();
    expect(spyEmit).toHaveBeenCalledWith([hostComponent.courses[3]]);
  });
});
