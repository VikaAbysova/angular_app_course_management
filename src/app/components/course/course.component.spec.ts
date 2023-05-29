import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  const courseItem = {
    id: '1',
    title: 'Angular',
    creationDate: new Date(),
    durationMin: 30,
    description: 'description1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent],
    });
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = courseItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the course title in "h1" tag', () => {
    const h1Element: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(h1Element.textContent).toContain('Angular');
  });

  it('should contain the course durationMin in class "time"', () => {
    const timeElement: HTMLElement =
      fixture.nativeElement.querySelector('.time');
    expect(timeElement.textContent).toContain(30);
  });

  it('should contain the current date in class calendar', () => {
    const calendarElement: HTMLElement =
      fixture.nativeElement.querySelector('.calendar');
    const currentDate = new Date(2023, 4, 29);
    component.course.creationDate = currentDate;
    expect(calendarElement.textContent).toContain('29 May, 2023');
  });

  it('should contain the course description in "p" tag', () => {
    const pElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(pElement.textContent).toContain('description1');
  });

  it('should contain the <button> "Edit"', () => {
    const button: HTMLElement =
      fixture.nativeElement.querySelector('.btn-edit');
    expect(button.textContent).toContain('Edit');
  });

  it('should contain the <button> "Delete"', () => {
    const button: HTMLElement =
      fixture.nativeElement.querySelector('.btn-delete');
    expect(button.textContent).toContain('Delete');
  });

  it('should emit the id value when button is clicked', () => {
    component.course.id = '3';
    const button: HTMLElement =
      fixture.nativeElement.querySelector('.btn-delete');
    spyOn(component.deleteId, 'emit');
    button.click();
    expect(component.deleteId.emit).toHaveBeenCalledWith('3');
  });

  it('should called the function by clicking the delete button', () => {
    const button: HTMLElement =
      fixture.nativeElement.querySelector('.btn-delete');
    spyOn(component, 'deleteCourse');
    button.click();
    expect(component.deleteCourse).toHaveBeenCalled();
  });
});
