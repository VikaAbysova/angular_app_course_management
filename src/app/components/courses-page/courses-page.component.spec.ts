import { coursesList } from './../../mocks/courses.mock';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
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

  it('should delete course when deleteCourse method called', () => {
    component.courses = coursesList;
    fixture.detectChanges();
    component.deleteCourse('1');
    expect(component.courses.length).toEqual(coursesList.length - 1);
  });

  // it('should return 2 when trachById method called', () => {
  //   const courseItem = {
  //     id: '2',
  //     title: 'title 2',
  //     creationDate: new Date(),
  //     durationMin: 40,
  //     description: 'description2',
  //     topRated: true,
  //   };
  //   expect(component.trackById(0, courseItem)).toBe('2');
  // });

  it('should render list of courses using *ngFor directive', () => {
    const coursesList = fixture.debugElement.queryAll(By.css('app-course'));
    expect(coursesList.length).toBe(coursesList.length);
  });

  it('should initialize property courses when ngOnInit method called', () => {
    component.ngOnInit();
    expect(component.courses).toEqual(coursesList);
  });

  it("shouldn't render message element when courses exist", () => {
    component.courses = coursesList;
    fixture.detectChanges();
    const messageEl = fixture.debugElement.query(By.css('.message'));
    expect(messageEl).toBeNull();
  });

  it('should render message when courses are empty', () => {
    component.courses = [];
    fixture.detectChanges();
    const messageEl = fixture.debugElement.query(By.css('.message'));
    expect(messageEl).toBeTruthy();
    expect(messageEl.nativeElement.textContent).toBe(
      'NO DATA, FEEL FREE TO ADD NEW COURSE'
    );
  });

  it("shouldn't render load-more button when courses are empty", () => {
    component.courses = [];
    fixture.detectChanges();
    const loadMoreBtn = fixture.debugElement.query(By.css('app-load-more-btn'));
    expect(loadMoreBtn).toBeNull();
  });

  it('should render load-more button when courses exist', () => {
    component.courses = coursesList;
    fixture.detectChanges();
    const loadMoreBtn = fixture.debugElement.query(By.css('app-load-more-btn'));
    expect(loadMoreBtn).toBeTruthy();
  });
});
