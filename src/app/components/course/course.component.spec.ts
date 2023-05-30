import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from './course.component';
import { By } from '@angular/platform-browser';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  const courseItem = {
    id: '1',
    title: 'Angular',
    creationDate: new Date(2023, 4, 29),
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

  it('should contain the course title in "title" class', () => {
    const titleElement = fixture.debugElement.query(By.css('.title'));
    const titleContent = titleElement.nativeElement.textContent;
    expect(titleContent).toContain('Angular');
  });

  it('should contain the course durationMin in class "time"', () => {
    const timeElement = fixture.debugElement.query(By.css('.time'));
    const timeContent = timeElement.nativeElement.textContent;
    expect(timeContent).toContain(30);
  });

  it('should contain the current date', () => {
    const dateElement = fixture.debugElement.query(By.css('.calendar'));
    const dateContent = dateElement.nativeElement.textContent;
    expect(dateContent).toContain('29 May, 2023');
  });

  it('should contain the course description in class "description"', () => {
    const pElement = fixture.debugElement.query(By.css('.description'));
    const pContent = pElement.nativeElement.textContent;
    expect(pContent).toContain('description1');
  });

  it('should contain the <button> "Edit"', () => {
    const button = fixture.debugElement.query(By.css('.btn-edit'));
    const btnContent = button.nativeElement.textContent;
    expect(btnContent).toContain('Edit');
  });

  it('should contain the <button> "Delete"', () => {
    const button = fixture.debugElement.query(By.css('.btn-delete'));
    const btnContent = button.nativeElement.textContent;
    expect(btnContent).toContain('Delete');
  });

  it('should emit course id when delete clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-delete'));
    spyOn(component.deleteId, 'emit');
    button.nativeElement.click();
    expect(component.deleteId.emit).toHaveBeenCalledWith('1');
  });

  it('should called the function by clicking the delete button', () => {
    const button = fixture.debugElement.query(By.css('.btn-delete'));
    spyOn(component, 'deleteCourse');
    button.nativeElement.click();
    expect(component.deleteCourse).toHaveBeenCalled();
  });
});
