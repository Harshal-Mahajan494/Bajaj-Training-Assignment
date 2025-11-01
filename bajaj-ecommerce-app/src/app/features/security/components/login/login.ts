import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthRequest } from '../../models/auth-request';
import { AuthResponse } from '../../models/auth-response';
import { SecurityApi } from '../../services/securirty-api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  private _securityApi = inject(SecurityApi);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  protected user: AuthRequest = new AuthRequest();
  protected authResponse?: AuthResponse;
  protected authErrorMessage: string = '';
  private _returnUrl: string = '';

  ngOnInit(): void {
    // ✅ Get redirect/return URL
    this._returnUrl =
      this._activatedRoute.snapshot.queryParams['returnUrl'] ||
      this._activatedRoute.snapshot.queryParams['redirect'] ||
      '/products';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this._securityApi.login(this.user).subscribe({
        next: (res: AuthResponse) => {
          // ✅ Save login details
          localStorage.setItem('userEmail', this.user.email);
          localStorage.setItem('userRole', res.user.role);
          localStorage.setItem('token', res.token);

          // ✅ Navigate back to intended route
          if (this._returnUrl === 'cart' || this._returnUrl === '/cart') {
            this._router.navigate(['/cart']);
          } else {
            this._router.navigate([this._returnUrl]);
          }
        },
        error: () => {
          console.error('Error during authentication');
          this.authErrorMessage = 'Invalid email or password.';
        },
      });
    }
  }
}
