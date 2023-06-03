import {By} from '@angular/platform-browser';
import {Component, DebugElement, ElementRef, NO_ERRORS_SCHEMA,} from '@angular/core';
import {FreshBorderDirective} from './course-relevance.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';

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
    const p: HTMLElement = elP.nativeElement;
    expect(p.classList.contains('blue-border')).toBe(false);
  });

  it('should color course in green border when creation date is within last 14 days', () => {
    component.creationDate.setDate(currentDate.getDate() - 5);
    fixture.detectChanges();
    const elDiv: DebugElement = fixture.debugElement.query(By.css('.course'));
    const div: HTMLElement = elDiv.nativeElement;
    expect(div.classList.contains('green-border')).toBe(true);
  });

  it('should color course in blue border when creation date is future', () => {
    component.creationDate.setDate(currentDate.getDate() + 2);
    fixture.detectChanges();
    const elDiv: DebugElement = fixture.debugElement.query(By.css('.course'));
    const div: HTMLElement = elDiv.nativeElement;
    expect(div.classList.contains('blue-border')).toBe(true);
  });

  it('should not change color course in other case', () => {
    component.creationDate.setDate(currentDate.getDate() - 15);
    fixture.detectChanges();
    const elDiv: DebugElement = fixture.debugElement.query(By.css('.course'));
    const div: HTMLElement = elDiv.nativeElement;
    const greenBorderClass = div.classList.contains('green-border');
    const blueBorderClass = div.classList.contains('blue-border');
    expect(greenBorderClass && blueBorderClass).toBe(false);
  });
});
