import { By } from '@angular/platform-browser';
import {
  DebugElement,
  Component,
  NO_ERRORS_SCHEMA,
  ElementRef,
} from '@angular/core';
import { FreshBorderDirective } from './fresh-border.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `
    <div class="course" [appFreshBorder]="creationDate">
      <p>Some text</p>
    </div>
  `,
})
class TestComponent {
  creationDate: Date;
}

describe('FreshBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  const currentDate = new Date(2023, 5, 3);
  jasmine.clock().install();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FreshBorderDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    const currentDateCourse = currentDate;
    jasmine.clock().mockDate(currentDateCourse);
    component.creationDate = currentDateCourse;
  });

  it('should create an instance', () => {
    const directive = new FreshBorderDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });

  it('should not color p element in blue', () => {
    component.creationDate.setDate(currentDate.getDate() + 1);
    fixture.detectChanges();
    const elP: DebugElement = fixture.debugElement.query(By.css('p'));
    const p = elP.nativeElement;
    expect(p.style.borderColor).not.toBe('blue');
  });

  it('should color course in green border when creation date is within last 14 days', () => {
    component.creationDate.setDate(currentDate.getDate() - 5);
    fixture.detectChanges();
    const elDiv: DebugElement = fixture.debugElement.query(By.css('.course'));
    const div: HTMLElement = elDiv.nativeElement;
    expect(div.style.borderColor).toBe('green');
  });

  it('should color course in blue border when creation date is future', () => {
    component.creationDate.setDate(currentDate.getDate() + 2);
    fixture.detectChanges();
    const elDiv: DebugElement = fixture.debugElement.query(By.css('.course'));
    const div: HTMLElement = elDiv.nativeElement;
    expect(div.style.borderColor).toBe('blue');
  });

  it('should not change color course in other case', () => {
    component.creationDate.setDate(currentDate.getDate() - 15);
    fixture.detectChanges();
    const elDiv: DebugElement = fixture.debugElement.query(By.css('.course'));
    const div: HTMLElement = elDiv.nativeElement;
    expect(div.style.borderColor).toBe('');
  });
});
