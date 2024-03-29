import { CoursesService } from './../../services/courses.service';
import { NavigationEnd, Router } from '@angular/router';
import {
  Component,
  OnInit,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course.interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit{
  title: string | undefined;
  constructor(
    private router: Router,
    private courseService: CoursesService,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.routerState.snapshot.root;
        const courseId = currentRoute.firstChild?.paramMap.get('id');

        if (Number(courseId)) {
          console.log('courseId', courseId);
          this.courseService
            .getItemById(courseId as string)
            .subscribe((course: Course) => (this.title = course.name));
        } else {
          this.title = '';
        }
      });
  }

}
