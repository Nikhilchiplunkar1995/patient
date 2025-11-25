import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: any[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe(
      response => {
        this.patients = response.data;
      },
      error => {
        console.error('Error fetching patients', error);
      }
    );
  }

  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe(
      response => {
        console.log('Patient deleted successfully!', response);
        this.loadPatients();
      },
      error => {
        console.error('Error deleting patient', error);
      }
    );
  }
}
