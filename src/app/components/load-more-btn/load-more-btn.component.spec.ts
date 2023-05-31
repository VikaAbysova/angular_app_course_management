import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreBtnComponent } from './load-more-btn.component';

describe('LoadMoreBtnComponent', () => {
  let component: LoadMoreBtnComponent;
  let fixture: ComponentFixture<LoadMoreBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadMoreBtnComponent],
    });
    fixture = TestBed.createComponent(LoadMoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Load More.." in console when button clicked', () => {
    const button = fixture.debugElement.query(By.css('.load-btn'));
    expect(button).toBeTruthy();
    spyOn(console, 'log');
    button.nativeElement.click();
    expect(console.log).toHaveBeenCalledWith('Load More..');
  });
});
