import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CreatedValidations {
    public samePassword(firstControl: string, secondControl: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get(firstControl)?.value;
            const c_password = control.get(secondControl)?.value;
    
            if (password != c_password) {
                return { samePassword: true }
            }else{
                return null
            }
        };
    }
}
