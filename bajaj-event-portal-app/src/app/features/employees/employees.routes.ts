// import { Routes } from '@angular/router';
// import { authGuard } from '../../core/guards/auth-guard';

// export const EMPLOYEE_ROUTES: Routes = [
//   {
//     // Public: View all employees
//     path: ' ',
//     loadComponent: () =>
//       import('./components/employees-list/employees-list').then(
//         (m) => m.EmployeesList
//       ),
//   },
//   {
//     // Public: View single employee details
//     path: ':id',
//     loadComponent: () =>
//       import('./components/employee-details/employee-details').then(
//         (m) => m.EmployeeDetails
//       ),
//   },
//   {
//     // Guarded: Only authenticated users (employees) can register a new employee
//     path: 'employees/register',
//     loadComponent: () =>
//       import('./components/register-employee/register-employee').then(
//         (m) => m.RegisterEmployee
//       ),
//     // canActivate: [authGuard], // As requested: "employee can add employee"
//   },
// ];
import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
// We will create this guard in Step 3
import { hrGuard } from '../../core/guards/hr-guard';

export const EMPLOYEE_ROUTES: Routes = [
  {
    // This now correctly matches /employees
    path: '', // <--- FIX 1
    loadComponent: () =>
      import('./components/employees-list/employees-list').then(
        (m) => m.EmployeesList
      ),
  },
  {
    // This now correctly matches /employees/register
    path: 'register', // <--- FIX 2
    loadComponent: () =>
      import('./components/register-employee/register-employee').then(
        (m) => m.RegisterEmployee
      ),
    // Use canActivate to check for login AND role
    canActivate: [authGuard, hrGuard], 
  },
  {
    // This correctly matches /employees/101 (must be LAST)
    path: ':id',
    loadComponent: () =>
      import('./components/employee-details/employee-details').then(
        (m) => m.EmployeeDetails
      ),
  },
];