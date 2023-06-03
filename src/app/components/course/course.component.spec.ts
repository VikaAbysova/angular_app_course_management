import { FreshBorderDirective } from 'src/app/directives/course-relevance.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from './course.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

describe('CourseComponent. Class test approach', () => {

  it('raises the deleteId event when function called', () => {
    const component = new CourseComponent();
    const course: Course = {
      id: '1',
      title: 'Angular',
      creationDate: new Date(),
      durationMin: 30,
      description: 'description1',
    };
    component.course = course;

    let emitedId: string | undefined;
    component.deleteId.subscribe((id: string) => (emitedId = id));
    component.emitDeleteId();
    expect(emitedId).toBe(course.id);
  });
});

describe('CourseComponent. Stand-alone approach', () => {
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
      declarations: [CourseComponent, FreshBorderDirective],
    });
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = courseItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain course title', () => {
    const titleElement = fixture.debugElement.query(By.css('.title'));
    const titleContent = titleElement.nativeElement.textContent;
    expect(titleContent).toContain('Angular');
  });

  it('should contain course durationMin', () => {
    const timeElement = fixture.debugElement.query(By.css('.time'));
    const timeContent = timeElement.nativeElement.textContent;
    expect(timeContent).toContain(30);
  });

  it('should contain current date', () => {
    const dateElement = fixture.debugElement.query(By.css('.calendar'));
    const dateContent = dateElement.nativeElement.textContent;
    expect(dateContent).toContain('29 May, 2023');
  });

  it('should contain course description', () => {
    const pElement = fixture.debugElement.query(By.css('.description'));
    const pContent = pElement.nativeElement.textContent;
    expect(pContent).toContain('description1');
  });

  it('should contain button "Edit"', () => {
    const button = fixture.debugElement.query(By.css('.btn-edit'));
    const btnContent = button.nativeElement.textContent;
    expect(btnContent).toContain('Edit');
  });

  it('should contain button "Delete"', () => {
    const button = fixture.debugElement.query(By.css('.btn-delete'));
    const btnContent = button.nativeElement.textContent;
    expect(btnContent).toContain('Delete');
  });

  it('should call function when delete button clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-delete'));
    spyOn(component, 'emitDeleteId');
    button.nativeElement.click();
    expect(component.emitDeleteId).toHaveBeenCalled();
  });
});

describe('CourseComponent. Test-host approach', () => {
  let hostComponent: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  @Component({
    template: `
      <app-course
        [course]="course"
        (deleteId)="deleteCourse($event)"
      ></app-course>
    `,
  })
  class HostComponent {
    course: Course = {
      id: '2',
      title: 'Hello',
      creationDate: new Date(),
      durationMin: 30,
      description: 'description2',
    };
    deleteCourse(id: string) {
      console.log('delete id', id);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, CourseComponent, FreshBorderDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display correct title from host component', () => {
    const title = fixture.debugElement.query(By.css('.title'));
    expect(title.nativeElement.textContent).toContain(
      hostComponent.course.title
    );
  });

  it('should emit deleteId event when button clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-delete'));
    const spyEmit = spyOn(hostComponent, 'deleteCourse');
    button.nativeElement.click();
    expect(spyEmit).toHaveBeenCalledWith(hostComponent.course.id);
  });
});
