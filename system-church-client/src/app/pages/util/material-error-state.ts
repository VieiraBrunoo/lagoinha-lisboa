import { ErrorStateMatcher } from "@angular/material";
import { FormControl, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from "@angular/forms";

export class MaterialErrorState implements ErrorStateMatcher {

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }

    patternValidator(regexp: RegExp): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          const value = control.value;
          if (value === '') {
            return null;
          }
          return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
        };
    }
}
