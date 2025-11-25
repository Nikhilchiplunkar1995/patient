import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {
  patientForm: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      gender: [''],
      conditionDescription: ['']
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService.addPatient(this.patientForm.value).subscribe(
        response => {
          console.log('Patient added successfully!', response);
          this.patientForm.reset();
        },
        error => {
          console.error('Error adding patient', error);
        }
      );
    }
  }
}
