import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { coursesList } from 'src/app/mocks/courses.mock';

describe('CoursesPageComponent', () => {
  const mockCoursesList = [
    {
      id: '1',
      title: 'title 1',
      creationDate: new Date(),
      durationMin: 30,
      description: 'description1',
    },
    {
      id: '2',
      title: 'title 2',
      creationDate: new Date(),
      durationMin: 40,
      description: 'description2',
    },
  ];
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button with "Add course"', () => {
    const button = fixture.debugElement.query(By.css('.btn-plus'));
    const btnContent = button.nativeElement.textContent;
    expect(btnContent).toContain('Add course');
  });

  it('should show correct id when function called', () => {
    spyOn(console, 'log');
    const id = '3';
    component.deleteCourse(id);
    expect(console.log).toHaveBeenCalledWith('delete id', id);
  });

  it('should not change courses when deleteCourse method called', () => {
    const id = '1';
    component.courses = mockCoursesList;
    component.deleteCourse(id);
    expect(component.courses).toEqual(mockCoursesList);
  });

  it('should return 2 when trachById method called', () => {
    const courseItem = {
      id: '2',
      title: 'title 2',
      creationDate: new Date(),
      durationMin: 40,
      description: 'description2',
    };
    expect(component.trackById(0, courseItem)).toBe('2');
  });

  it('should render list of courses using *ngFor directive', () => {
    component.courses = mockCoursesList;
    fixture.detectChanges();
    const coursesList = fixture.debugElement.queryAll(By.css('app-course'));
    expect(mockCoursesList.length).toBe(coursesList.length);
  });

  it('should initialize property courses when ngOnInit method called', () => {
    component.ngOnInit();
    expect(component.courses).toEqual(coursesList);
  });
});
