import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmployeesApi } from '../../services/employees-api';
import { EmployeeRegistration } from '../../models/employee-registration';

@Component({
  selector: 'app-register-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-employee.html',
  styleUrl: './register-employee.css',
})
export class RegisterEmployee implements OnDestroy {
  private _employeesApi = inject(EmployeesApi);
  private _router = inject(Router);
  private _apiSubscription: Subscription;

  protected title: string = 'Register New Bajaj Employee';
  // Use the helper class to initialize the form
  protected register: EmployeeRegistration = new EmployeeRegistration(
    new FormBuilder()
  );

  protected onEmployeeSubmit(): void {
    if (this.register.employeeForm.invalid) {
      return; // Don't submit if form is invalid
    }

    this._apiSubscription = this._employeesApi
      .registerNewEmployee(this.register.employeeForm.value)
      .subscribe({
        next: (data) => {
          if (data.acknowledged === true) {
            // On success, navigate back to the employees list
            this._router.navigate(['/employees']);
          }
        },
        error: (err) => {
          console.error('Error registering employee:', err);
        },
      });
  }

  ngOnDestroy(): void {
    if (this._apiSubscription) {
      this._apiSubscription.unsubscribe();
    }
  }
}