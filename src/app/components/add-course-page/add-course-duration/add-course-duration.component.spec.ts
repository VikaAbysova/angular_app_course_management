import { FormsModule } from '@angular/forms';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseDurationComponent } from './add-course-duration.component';

describe('AddCourseDurationComponent', () => {
  let component: AddCourseDurationComponent;
  let fixture: ComponentFixture<AddCourseDurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseDurationComponent, DurationPipe],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AddCourseDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
