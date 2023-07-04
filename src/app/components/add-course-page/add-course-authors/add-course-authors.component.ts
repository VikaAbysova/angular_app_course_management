import { AuthorsService } from './../../../services/authors.service';
import { Authors } from './../../../interfaces/authors.interface';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Component, forwardRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course-authors',
  templateUrl: './add-course-authors.component.html',
  styleUrls: ['./add-course-authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddCourseAuthorsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AddCourseAuthorsComponent),
    },
  ],
})
export class AddCourseAuthorsComponent
  implements ControlValueAccessor, OnInit, Validator
{
  authorsTags: Authors[];
  authorsNames: Authors[];
  searchInput = '';
  disabled = false;

  isAuthorsInvalid = false;
  isAuthorsTouched = false;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.authorsTags = [];
    this.authorsNames = [];
  }

  changed: (authorsTags: Authors[]) => void;
  touched: () => void;

  onChanged(event: Event): void {
    const value = (<HTMLInputElement>event.target).value;
    if (value.length > 0) {
      this.authorsService
        .getAuthors({ textFragment: value })
        .subscribe((authors) => (this.authorsNames = [...authors]));
    }
    this.authorsNames = [];
    this.changed(this.authorsTags);
  }

  addAuthor(author: Authors) {
    this.isAuthorsInvalid = false;
    this.authorsTags.push(author);
    this.authorsNames = [
      ...this.authorsNames.filter((author) => author.id !== author.id),
    ];
    this.searchInput = '';
    this.changed(this.authorsTags);
  }

  removeTag(author: Authors) {
    this.isAuthorsInvalid = false;
    const index = this.authorsTags.indexOf(author);
    this.authorsTags.splice(index, 1);
    this.authorsNames.push({ ...author });
    this.changed(this.authorsTags);
  }

  writeValue(authorsTags: Authors[]): void {
    this.authorsTags = authorsTags;
    this.isAuthorsInvalid = this.authorsTags.length? false: true;
  }
  registerOnChange(fn: () => void): void {
    this.changed = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  validate(control: AbstractControl<Authors[]>): ValidationErrors | null {
    if (!control.value.length) {
      this.isAuthorsInvalid = true;
      this.isAuthorsTouched = true;
      return { emptyAuthors: true };
    }
    return null;
  }
}
