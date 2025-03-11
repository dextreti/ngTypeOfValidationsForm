import { FormControl, ValidatorFn, AbstractControlOptions } from '@angular/forms';

export class CustomFormControl extends FormControl {
  constructor(
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null
  ) {
    super(formState, validatorOrOpts);
  }

  override updateValueAndValidity(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    
    super.updateValueAndValidity(opts);
     
     const errors = this.errors || {};
     
     if (!Object.keys(errors).length) {
       this.setErrors(null);
       return;
     }
    
    if (!this.hasError('CustomErrors')) {
      const messageError = Object.keys(this.errors!).map((key) => this.errors![key]).join(', ');
    
      
      
      this.setErrors({ CustomErrors: messageError });
    }


  }
}







  


