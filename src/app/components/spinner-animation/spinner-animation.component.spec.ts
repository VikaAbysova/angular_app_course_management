import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerAnimationComponent } from './spinner-animation.component';

describe('SpinnerAnimationComponent', () => {
  let component: SpinnerAnimationComponent;
  let fixture: ComponentFixture<SpinnerAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerAnimationComponent]
    });
    fixture = TestBed.createComponent(SpinnerAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
