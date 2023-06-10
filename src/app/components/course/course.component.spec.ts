import { DurationPipe } from './../../pipes/duration.pipe';
import { FreshBorderDirective } from 'src/app/directives/course-relevance.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from './course.component';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';
import { DatePipe } from '@angular/common';

describe('CourseComponent. Class test approach', () => {
  it('raises the deleteId event when function called', () => {
    const component = new CourseComponent(new DurationPipe());
    const course: Course = {
      id: '1',
      title: 'Angular',
      creationDate: new Date(2023, 4, 29),
      durationMin: 180,
      description: 'description1',
      topRated: true,
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
    durationMin: 140,
    description: 'description1',
    topRated: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, FreshBorderDirective],
      providers: [DurationPipe],
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
    expect(titleElement).toBeTruthy();
  });

  it('should contain course durationMin', () => {
    const durationPipe = new DurationPipe();
    component.course.durationMin = durationPipe.transform(140);
    fixture.detectChanges();
    expect(component.course.durationMin).toContain('2 h 20 min');
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

  it('should display icon star if topRated is true', () => {
    const spanEl: DebugElement = fixture.debugElement.query(By.css('.title'));
    expect(spanEl.nativeElement.classList).toContain('icon-star');
  });

  it('should change background color if topRated is true', () => {
    const courseEl: DebugElement = fixture.debugElement.query(
      By.css('.course')
    );
    expect(courseEl.nativeElement.classList).toContain('background-topRated');
  });

  it('should not display icon star if topRated is false', () => {
    const courseRatedFalse = {
      id: '1',
      title: 'Angular',
      creationDate: new Date(2023, 4, 29),
      durationMin: 30,
      description: 'description1',
      topRated: false,
    };
    component.course = courseRatedFalse;
    fixture.detectChanges();
    const spanEl: DebugElement = fixture.debugElement.query(By.css('.title'));
    expect(spanEl.nativeElement.classList).not.toContain('.icon-star');
  });

  it('should not change background color if topRated is false', () => {
    const courseRatedFalse = {
      id: '1',
      title: 'Angular',
      creationDate: new Date(2023, 4, 29),
      durationMin: 30,
      description: 'description1',
      topRated: false,
    };
    component.course = courseRatedFalse;
    fixture.detectChanges();
    const courseEl: DebugElement = fixture.debugElement.query(
      By.css('.course')
    );
    expect(courseEl.nativeElement.classList).not.toContain('bg-color');
  });

  it('should display data in correct format "29 May, 2023"', () => {
    const pipeDate = new DatePipe('en-US');
    const date = component.course.creationDate;
    const formatDate = pipeDate.transform(date, 'd MMM, y');
    expect(formatDate).toEqual('29 May, 2023');
  });

  it('should display duration 140 in correct format "2 h 20 min"', () => {
    const pipeDuration = new DurationPipe();
    component.course.durationMin = pipeDuration.transform(140);
    expect(component.course.durationMin).toEqual('2 h 20 min');
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
      topRated: true,
    };
    deleteCourse(id: string) {
      console.log('delete id', id);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, CourseComponent, FreshBorderDirective],
      providers: [DurationPipe],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display correct title from host component', () => {
    const title = fixture.debugElement.query(By.css('.title'));
    expect(title.nativeElement.textContent).toContain(
      hostComponent.course.title.toUpperCase()
    );
  });

  it('should emit deleteId event when button clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-delete'));
    const spyEmit = spyOn(hostComponent, 'deleteCourse');
    button.nativeElement.click();
    expect(spyEmit).toHaveBeenCalledWith(hostComponent.course.id);
  });
});
