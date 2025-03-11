import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import { CustomErrorsDirective } from "../../shared/directive/custom.errors.directive";
import { CustomValidators } from "../../shared/controls/custom.validators";



@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomErrorsDirective
  ],
  templateUrl: './patient.component.html',
  
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit  {
  
  Form!: FormGroup;
  
  private fb: FormBuilder = inject(FormBuilder);
  
  
  optroles = ['Admin', 'Editor', 'User'];
  ngOnInit(): void {

    this.Form = this.fb.group({
      name: ['',
        [          
          CustomValidators.onlyLetter(),          
          CustomValidators.maxLength(6),          
          CustomValidators.isIqual("Carlos")
        ]]
      ,       
      email: ['', [CustomValidators.isRequired(), CustomValidators.isEmail()]],        
      phone: ['', [CustomValidators.onlyNumber()]],      
      role: ['', [CustomValidators.isRequired(), CustomValidators.isIqual("Editor")]]
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

