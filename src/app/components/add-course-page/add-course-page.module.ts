import { NgModule } from '@angular/core';
import { AddCoursePageRoutingModule } from './../../add-course-page-routing.module';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { FormsModule } from '@angular/forms';
import { AddCourseAuthorsComponent } from './add-course-authors/add-course-authors.component';
import { AddCoursePageComponent } from './add-course-page.component';
import { CommonModule } from '@angular/common';
import { AddCourseDateComponent } from './add-course-date/add-course-date.component';
import { AddCourseDurationComponent } from './add-course-duration/add-course-duration.component';

@NgModule({
  declarations: [
    AddCoursePageComponent,
    AddCourseDateComponent,
    AddCourseDurationComponent,
    AddCourseAuthorsComponent,
    DurationPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddCoursePageRoutingModule,
  ],
  exports: [AddCoursePageComponent],
})
export class AddCoursePageModule {}
