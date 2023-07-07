import { NgModule } from '@angular/core';
import { AddCoursePageRoutingModule } from './../../add-course-page-routing.module';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseAuthorsComponent } from './add-course-authors/add-course-authors.component';
import { AddCoursePageComponent } from './add-course-page.component';
import { CommonModule } from '@angular/common';
import { AddCourseDateComponent } from './add-course-date/add-course-date.component';
import { AddCourseDurationComponent } from './add-course-duration/add-course-duration.component';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}

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
    ReactiveFormsModule,
    AddCoursePageRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [AddCoursePageComponent],
})
export class AddCoursePageModule {}
