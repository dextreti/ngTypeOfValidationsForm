import { Directive, AfterViewInit, OnDestroy, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[CustomErrors]'
})
export class CustomErrorsDirective implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(@Optional() @Self() private ngControl: NgControl) {}

  ngAfterViewInit(): void {
    if (!this.ngControl?.control) return;
    
    setTimeout(() => {
      this.updateCustomErrors();

      this.ngControl.control!.valueChanges
                             .pipe(takeUntil(this.destroy$))
                             .subscribe(() => this.updateCustomErrors());
    });
  }  

  private updateCustomErrors(): void {
    const errors = this.ngControl.control?.errors || {};
    if (!Object.keys(errors).length) {
      this.ngControl.control?.setErrors(null);
      return;
    }
    if (!this.ngControl.control?.hasError('CustomErrors')) {
      //const errorMessage = Object.keys(errors).map(key => errors[key]).join(', ');
        const errorMessage = Object.keys(errors).map(key => `🔹 ${errors[key]}`).join(' <br>');
        this.ngControl.control!.setErrors({ CustomErrors: errorMessage });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}



