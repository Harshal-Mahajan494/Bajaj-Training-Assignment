import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Imports DatePipe
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Employee } from '../../models/employee';
import { EmployeesApi } from '../../services/employees-api';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule], // CommonModule provides DatePipe, UpperCasePipe etc.
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails implements OnInit, OnDestroy {
  private _employeesApi = inject(EmployeesApi);
  private _activatedRoute = inject(ActivatedRoute);
  private _apiSubscription: Subscription;

  protected title: string = 'Employee Details - ';
  protected employee: Employee;

  ngOnInit(): void {
    // Get the 'id' from the URL
    let employeeId = this._activatedRoute.snapshot.params['id'];

    if (employeeId) {
      this._apiSubscription = this._employeesApi
        .getEmployeeDetails(employeeId)
        .subscribe({
          next: (data) => {
            this.employee = data;
          },
          error: (err) => {
            console.error('Error fetching employee details:', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this._apiSubscription) {
      this._apiSubscription.unsubscribe();
    }
  }
}