import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have <button> with "Add course"', () => {
  //   const pageElement: HTMLElement = fixture.nativeElement;
  //   const button = pageElement.querySelector('button');
  //   expect(button.textContent).toEqual('Add course');
  // })
});
