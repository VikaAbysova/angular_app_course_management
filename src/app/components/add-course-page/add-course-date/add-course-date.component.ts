import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-add-course-date',
  templateUrl: './add-course-date.component.html',
  styleUrls: ['./add-course-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddCourseDateComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AddCourseDateComponent),
    },
  ],
})
export class AddCourseDateComponent implements ControlValueAccessor, Validator {

  isDateInvalid = false;
  isDateTouched = false;
  dateValue: string;
  disabled = false;

  changed: (date: string) => void;
  touched: () => void;

  onChange(event: Event): void {
    let value: string = (<HTMLInputElement>event.target).value;
    if (value.length === 2 || value.length === 5) {
      value += '/';
      (<HTMLInputElement>event.target).value = value;
    }
    this.changed(value);
  }

  writeValue(date: string): void {
    this.dateValue = date;
  }
  registerOnChange(fn: () => void): void {
    this.changed = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const partArray = control.value.split('/');
    const date = +partArray[1];
    const month = +partArray[0];
    this.isDateInvalid = false;
    if (!control.value) {
      this.isDateInvalid = true;
      this.isDateTouched = true;
    }
    if (date > 28 && month === 2) {
      this.isDateInvalid = true;
      return { restrictedDateInFebruary: true };
    }
    if (date > 31) {
      this.isDateInvalid = true;
      return { restrictedDateMore: true };
    }
    if (month > 12) {
      this.isDateInvalid = true;
      return { restrictedMonthMore: true };
    }
    if (control.value.length < 10) {
      this.isDateInvalid = true;
      return { restrictedFormat: true };
    }

    this.isDateTouched = true;
    return null;
  }
}
