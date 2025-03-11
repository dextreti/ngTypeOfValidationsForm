import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PatientComponent } from './components/TypeValidation/patient.component';
import { Patient1Component } from './components/TypeValidation1/patient1.component';
import { Patient2Component } from './components/TypeValidation2/patient2.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PatientComponent,
    //Patient1Component,
    //Patient2Component
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'dental';

  //patient$: Observable<patientResponse[]>;
  error!: Observable<string | null>;

  
  ngOnInit(): void { 

  }

  onClick() {

  }



}
