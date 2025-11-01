import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";

import { AuthRequest } from "../models/auth-request";
import { AuthResponse } from "../models/auth-response";

@Injectable({
  providedIn: 'root'
})
export class SecurityApi {
  // ✅ Common base URL for auth APIs
  private _baseUrl: string = "http://localhost:9090/api/auth";
  private _httpClient = inject(HttpClient);

  // ====================================================
  // ✅ 1. User Registration
  // ====================================================
  public registerUser(user: any): Observable<any> {
    console.log(user);
    return this._httpClient.post<any>(`${this._baseUrl}/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('User registered successfully:', response);
      })
    );
  }

  // ====================================================
  // ✅ 2. User Login
  // ====================================================
  public login(user: AuthRequest): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(`${this._baseUrl}/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        // ✅ Save token and user info after successful login
        if (response.token) {
          localStorage.setItem('token', response.token);
          // localStorage.setItem('refreshToken', response.refreshToken);
          // localStorage.setItem('role', response.role);
          localStorage.setItem('email', response.user.email);
          console.log('Login successful:', response);
        }
      })
    );
  }

  // ====================================================
  // ✅ 3. Token Helpers
  // ====================================================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ====================================================
  // ✅ 4. Logout
  // ====================================================
  logout(): void {
    localStorage.clear();
    console.log('User logged out and storage cleared.');
  }

  // ====================================================
  // (Optional) 5. Refresh Token (if backend supports)
  // ====================================================
  // public refreshToken(): Observable<AuthResponse> {
  //   const refreshToken = this.getRefreshToken();
  //   const email = localStorage.getItem('email');

  //   if (!refreshToken || !email) {
  //     console.warn('No refresh token or email available. Logging out.');
  //     this.logout();
  //     throw new Error('No refresh token available');
  //   }

  //   return this._httpClient.post<AuthResponse>(
  //     `${this._baseUrl}/refresh`,
  //     { email, refreshToken },
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json'
  //       })
  //     }
  //   ).pipe(
  //     tap(response => {
  //       if (response.token) localStorage.setItem('token', response.token);
  //       if (response.refreshToken) localStorage.setItem('refreshToken', response.refreshToken);
  //       console.log('Token refreshed successfully:', response);
  //     })
  //   );
  // }
}
