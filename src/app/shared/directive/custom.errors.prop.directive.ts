import { Directive, Input, OnChanges, SimpleChanges, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[CustomErrorsProp]',
  standalone: true,
})
export class CustomErrorsPropDirective implements OnChanges, OnDestroy {
  @Input() CustomErrorsProp!: AbstractControl;

  private subscription!: Subscription;
  private errorElement!: HTMLElement;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['CustomErrorsProp']) {
            
      if (this.subscription) {
        this.subscription.unsubscribe();
      }  
      
      if (!this.errorElement) {
        this.errorElement = this.renderer.createElement('div');
        this.renderer.appendChild(this.el.nativeElement, this.errorElement);
      }  
      
      this.subscription = this.CustomErrorsProp.statusChanges.subscribe(() => {
        this.updateErrorMessage();
      });  
      
      this.CustomErrorsProp.updateValueAndValidity({ emitEvent: true });
    }
  }
  
  private updateErrorMessage(): void {
      const errors = this.CustomErrorsProp.errors;

      if (!errors) {      
      this.renderer.setProperty(this.errorElement, 'innerText', '');
      return;
    }   
  
    //const errorMessage = Object.keys(errors).map((key) => `- ${errors[key]}`).join('\n');        
    const errorMessage = Object.keys(errors).map((key) => errors[key]).join(', ');
    
    this.renderer.setProperty(this.errorElement, 'innerText', `${errorMessage}`);
  }

  ngOnDestroy(): void {    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.errorElement) {
      this.renderer.removeChild(this.el.nativeElement, this.errorElement);
    }
  }

 

}