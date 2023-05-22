import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreBtnComponent } from './load-more-btn.component';

describe('LoadMoreBtnComponent', () => {
  let component: LoadMoreBtnComponent;
  let fixture: ComponentFixture<LoadMoreBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadMoreBtnComponent]
    });
    fixture = TestBed.createComponent(LoadMoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
