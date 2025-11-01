import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityApi } from '../../../security/services/securirty-api';
import { UserRegistration } from '../../models/event-registration';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-event.html',
  styleUrls: ['./register-event.css'],
})
export class RegisterUser {
  private _usersApi = inject(SecurityApi);
  private _router = inject(Router);
  private _usersApiSubscription?: Subscription;

  protected title: string = 'Register New User!';

  protected registerForm = inject(FormBuilder).group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required]],
    role: ['', Validators.required],
  });

  protected onUserSubmit(): void {
    if (this.registerForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    // ✅ Map form fields to backend format
    const userData = {
      name: this.registerForm.value.fullName, // backend expects 'name'
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone,
      role: this.registerForm.value.role?.toLowerCase(),
    };

    console.log('➡ Sending registration data:', userData);

    this._usersApiSubscription = this._usersApi.registerUser(userData).subscribe({
      next: (data) => {
        console.log('✅ Server Response:', data);
        alert('✅ User registered successfully!');
        this._router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('❌ User registration failed:', err);
        alert('Registration failed. Please try again!');
      },
    });
  }

  ngOnDestroy(): void {
    this._usersApiSubscription?.unsubscribe();
  }
}
