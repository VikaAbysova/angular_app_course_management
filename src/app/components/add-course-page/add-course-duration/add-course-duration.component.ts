import { Component, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-add-course-duration',
  templateUrl: './add-course-duration.component.html',
  styleUrls: ['./add-course-duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddCourseDurationComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AddCourseDurationComponent),
    },
  ],
})
export class AddCourseDurationComponent
  implements ControlValueAccessor, Validator
{
  isDurationInvalid = false;
  isDurationTouched = false;
  durationValue: string;
  disabled = false;

  changed: (duration: string) => void;
  touched: () => void;

  onChanged(event: Event): void {
    const value = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  writeValue(duration: string): void {
    this.durationValue = duration;
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
  validate(control: AbstractControl): ValidationErrors | null {
    this.isDurationInvalid = false;
    if (!control.value) {
      this.isDurationInvalid = true;
      this.isDurationTouched = true;
    }
    const pattern = /^\d+$/;
    if (!pattern.test(control.value) && control.value) {
      this.isDurationInvalid = true;
      return { invalidNumber: true };
    }
    this.isDurationTouched = true;
    return null;
  }
}
