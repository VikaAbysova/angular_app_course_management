import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSearchComponent } from './courses-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoursesSearchComponent', () => {
  let component: CoursesSearchComponent;
  let fixture: ComponentFixture<CoursesSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesSearchComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CoursesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update input value after changing the searchCourse value', async () => {
    component.searchCourse = 'test value';
    fixture.detectChanges();
    await fixture.whenStable();
    const inputElement = fixture.nativeElement.querySelector('.input-search');
    expect(inputElement.value).toBe('test value');
  });

  it('should update searchCourse value when setting input value', () => {
    const inputElement = fixture.nativeElement.querySelector('.input-search');
    inputElement.value = 'test value';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.searchCourse).toBe('test value');
  });

  it('should called function when button clicked', () => {
    const button = fixture.nativeElement.querySelector('.btn-search');
    expect(button.textContent).toContain('Search');
    spyOn(component, 'searchClick');
    button.click();
    expect(component.searchClick).toHaveBeenCalled();
  });

  it('should display input value in console log when changing input value', () => {
    const inputElement = fixture.nativeElement.querySelector('.input-search');
    const button = fixture.nativeElement.querySelector('.btn-search');
    spyOn(console, 'log');
    inputElement.value = 'test value';
    inputElement.dispatchEvent(new Event('input'));
    button.click();
    expect(console.log).toHaveBeenCalledWith('test value');
  });
});
