import { Component,  inject,  OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormBuilder, FormGroup, ReactiveFormsModule,  } from '@angular/forms';
import { CustomValidators } from '../../shared/controls/custom.validators';
import { CustomFormControl } from '../../shared/controls/custom.control';

@Component({
  selector: 'app-patient1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient1.component.html',
  styleUrl: './patient1.component.css'
})
export class Patient1Component implements OnInit {
  
  Form!: FormGroup;  
  private fb: FormBuilder = inject(FormBuilder);
  
  
  optroles = ['Admin', 'Editor', 'User'];
  ngOnInit(): void {

    this.Form = this.fb.group({
      name: new CustomFormControl('',
        [          
          CustomValidators.onlyLetter(),          
          CustomValidators.maxLength(8),          
          CustomValidators.isIqual("Fernando")          
        ])
      ,       
      email: new CustomFormControl('', [CustomValidators.isRequired(), CustomValidators.isEmail()]),        
      phone: new CustomFormControl('', [CustomValidators.onlyNumber()]),      
      role: new CustomFormControl('', [CustomValidators.isRequired()])
    });   
    
  }  

  onNextFocus(options: { nextElement?: HTMLElement; isValid?: boolean }): void {    
    const { nextElement, isValid } = options;
    if ((isValid === undefined || isValid) && typeof nextElement?.focus === 'function') {
      nextElement.focus();
    }
  }
  
  onSaveFrm() {

    const mapForm = this.Form.value as {
      name: string,
      email: string,
      phone: string,
      schedule: string,
      time: string
    };

    console.log("Registro save: ", mapForm)
  }  
  

}

