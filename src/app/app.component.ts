import { Component, OnInit } from '@angular/core';
import { Course } from './model/course.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  courses: Course[];

  ngOnInit() {
    this.courses = [
      {
        id: '1',
        title: 'Course 1',
        creationDate: new Date(),
        durationMin: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adip, ',
      },
      {
        id: '2',
        title: 'Course 2',
        creationDate: new Date(),
        durationMin: 20,
        description: ' Lorem ipsum dolor sit amet,',
      },
      {
        id: '3',
        title: 'Course 3',
        creationDate: new Date(),
        durationMin: 30,
        description: 'Lorem ipsum dolor sit amet, consectetur adip',
      },
      {
        id: '4',
        title: 'Course 4',
        creationDate: new Date(),
        durationMin: 40,
        description: 'Lorem ipsum dolor sit amet, consectetur adip',
      },
    ];
    console.log('onInit');
  }

  deleteCourse(id: string) {
    console.log('delete id', id);
  }
}
