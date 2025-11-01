import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Helper class to build the reactive form for employee registration
export class EmployeeRegistration {
  public employeeForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.employeeForm = this._fb.group({
      employeeId: [null, [Validators.required]],
      employeeCode: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      department: ['', [Validators.required]],
      joiningDate: [null, [Validators.required]],
      profilePicture: ['images/default-profile.png', [Validators.required]],
    });
  }
}