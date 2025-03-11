import { Component,  inject,  OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors,  } from '@angular/forms';
import { CustomValidators } from '../../shared/controls/custom.validators';
import { CustomFormControl } from '../../shared/controls/custom.control';

@Component({
  selector: 'app-patient2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient2.component.html',
  styleUrl: './patient2.component.css'
})
export class Patient2Component implements OnInit {
  
  Form!: FormGroup;  
  private fb: FormBuilder = inject(FormBuilder);
  
  
  optroles = ['Admin', 'Editor', 'User'];
  ngOnInit(): void {

    this.Form = this.fb.group({
      name: ['',
        [          
          CustomValidators.onlyLetter(),          
          CustomValidators.maxLength(8),
        ]]
      ,       
      email: ['', [CustomValidators.isRequired(), CustomValidators.isEmail()]],        
      phone: ['', [CustomValidators.onlyNumber()]],      
      role: ['', [CustomValidators.isRequired()]]
    });   
    
  }  

  onNextFocus(options: { nextElement?: HTMLElement; isValid?: boolean }): void {    
    const { nextElement, isValid } = options;
    if ((isValid === undefined || isValid) && typeof nextElement?.focus === 'function') {
      nextElement.focus();
    }
  }


  getError(errors: ValidationErrors)  {
    if (!errors) return "";    
    const errorMessage = Object.keys(errors).map(key => `🔹 ${errors[key]}`).join("<br>");
    //const messageError = Object.keys(errors).map(key => errors[key]).join(', ');
    
    return errorMessage;
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

