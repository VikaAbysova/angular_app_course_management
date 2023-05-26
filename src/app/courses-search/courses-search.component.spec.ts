import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSearchComponent } from './courses-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoursesSearchComponent', () => {
  let component: CoursesSearchComponent;
  let fixture: ComponentFixture<CoursesSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesSearchComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CoursesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
