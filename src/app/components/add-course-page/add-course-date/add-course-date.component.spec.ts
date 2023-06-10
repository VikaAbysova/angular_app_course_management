import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseDateComponent } from './add-course-date.component';

describe('AddCourseDateComponent', () => {
  let component: AddCourseDateComponent;
  let fixture: ComponentFixture<AddCourseDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseDateComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(AddCourseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
