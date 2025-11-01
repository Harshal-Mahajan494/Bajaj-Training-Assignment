import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee';
import { CudResponse } from '../../../shared/models/cud-response'; // Assuming path

@Injectable({
  providedIn: 'root',
})
export class EmployeesApi {
  private _http = inject(HttpClient);
  // Adjust the base URL to your employees API endpoint
  private _baseUrl = 'http://localhost:9090/api/employees';

  /**
   * Fetches all employees from the server
   * @returns Observable<Employee[]>
   */
  getAllEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this._baseUrl);
  }

  /**
   * Fetches a single employee by their ID
   * @param id - The numeric ID of the employee
   * @returns Observable<Employee>
   */
  getEmployeeDetails(id: number): Observable<Employee> {
    return this._http.get<Employee>(`${this._baseUrl}/${id}`);
  }

  /**
   * Registers a new employee
   * @param employeeData - The new employee's data
   * @returns Observable<CudResponse>
   */
  registerNewEmployee(employeeData: Employee): Observable<CudResponse> {
    return this._http.post<CudResponse>(this._baseUrl, employeeData);
  }

  /**
   * Deletes an employee
   * @param id - The numeric ID of the employee to delete
   * @returns Observable<CudResponse>
   */
  deleteEmployee(id: number): Observable<CudResponse> {
    return this._http.delete<CudResponse>(`${this._baseUrl}/${id}`);
  }
}