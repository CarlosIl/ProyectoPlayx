import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CreatedValidations {
    //The two controls must have the same value
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

    //At least one of the two controls must be filled
    public atLeastOne(firstControl: string, secondControl: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const post = control.get(firstControl)?.value;
            const post_file = control.get(secondControl)?.value;
    
            if (post == "" && post_file == "") {
                return { atLeastOne: true }
            }else{
                return null
            }
        };
    }
}
