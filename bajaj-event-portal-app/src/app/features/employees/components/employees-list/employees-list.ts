import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgxPaginationModule } from 'ngx-pagination';

import { Employee } from '../../models/employee';
import { EmployeesApi } from '../../services/employees-api';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, RouterLink],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList implements OnInit, OnDestroy {
  private _employeesApi = inject(EmployeesApi);
  private _apiSubscription: Subscription;

  protected title: string = 'Bajaj Finserv Employees';
  protected subTitle: string = 'List of all active employees';
  protected columns: string[] = [
    'Emp Code',
    'Name',
    'Email',
    'Department',
    'Designation',
    'Details',
    'Delete',
  ];
  protected employees: Employee[] = [];
  protected filteredEmployees: Employee[] = [];

  protected searchChars: string = '';
  protected pageNumber: number = 1;
  protected pageSize: number = 5; // Set page size as you like
  protected role: string | null;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');

    // If user is not HR, remove the "Delete" column
    if (this.role !== 'Hr') {
      this.columns = this.columns.filter((col) => col !== 'Delete');
    }

    this._apiSubscription = this._employeesApi.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees];
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this._apiSubscription) {
      this._apiSubscription.unsubscribe();
    }
  }

  protected searchEmployees(): void {
    if (!this.searchChars || this.searchChars == '') {
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employees.filter(
        (emp) =>
          emp.firstName
            .toLocaleLowerCase()
            .includes(this.searchChars.toLocaleLowerCase()) ||
          emp.lastName
            .toLocaleLowerCase()
            .includes(this.searchChars.toLocaleLowerCase())
      );
    }
    this.pageNumber = 1; // Reset to first page
  }

  protected deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      // Note: You should handle the subscription and errors properly
      this._employeesApi.deleteEmployee(id).subscribe({
        next: (res) => {
          if (res.acknowledged) {
            // Reload the list after successful deletion
            this.filteredEmployees = this.filteredEmployees.filter(
              (emp) => emp.employeeId !== id
            );
            this.employees = this.employees.filter(
              (emp) => emp.employeeId !== id
            );
          }
        },
        error: (err) => console.error('Error deleting employee:', err),
      });
    }
  }
}