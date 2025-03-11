import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class CustomValidators {

    static isRequired(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const isValid = Validators.required(control); 
          return isValid === null ? null : { isRequired: 'This field is required' };
        };
    } 
    
    static isEmail(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value);
            return isValid ? null : { isEmail: "this format is incorrect!" };
        };
    }  
    
    static onlyNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const isValid = /^\d+$/.test(control.value);            
            return isValid ? null : { onlyNumber: "this field just allow numbers"};
        };
    }
    
    static onlyLetter(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(control.value);            
            return isValid ? null : { onlyLetter: "this field just allow letters" };            
        };
    }

    static maxLength(digit: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
    
            const value = control.value.toString();
            const isValid = value.length === digit;
            return  isValid?null: { maxLength: `The field must contain ${digit} digits.` };
        };
    }

    static isIqual(value:string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const isValid = control.value == value;
            return isValid ? null : { isNameIqual: `the value must be ${ value}` };
        };
    }
    
    
}

 