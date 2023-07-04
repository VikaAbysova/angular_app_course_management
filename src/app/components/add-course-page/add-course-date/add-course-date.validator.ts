import { AbstractControl, ValidationErrors } from '@angular/forms';
export function dateValidators(
    control: AbstractControl
  ): ValidationErrors | null {
    const partArray = control.value.split('/');
    const date = +partArray[1];
    const month = +partArray[0];
    const isDateCheck = new Date(control.value);
    if (date > 28 && month > 2) {
      return { restrictedDateInFebruary: true };
    }
    if (date > 31) {
      return { restrictedDateMore: true };
    }
    if (month > 12) {
      return { restrictedMonthMore: true };
    }
    if (!isDateCheck) {
      return { restrictedDate: true };
    }
    return null;
  }
