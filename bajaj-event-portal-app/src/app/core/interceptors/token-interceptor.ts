import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { SecurityApi } from '../../features/security/services/security-api';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const securityApi = inject(SecurityApi);
  const isAuthEndpoint = req.url.includes('/users');
  const token = localStorage.getItem('token');

  // Step 1️⃣ – Add token for all non-auth requests
  let modifiedReq = req;
  if (!isAuthEndpoint) {
    let headers = req.headers
      .set('Content-Type', 'application/json')
      .set('bajaj-authorization-token', token || '');
    modifiedReq = req.clone({ headers });
  }

  // Step 2️⃣ – Handle 401 errors and refresh token
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthEndpoint) {
        return securityApi.refreshToken().pipe(
          switchMap(response => {
            const newToken = response.token;
            // store new token immediately
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', response.refreshToken);

            const retryReq = req.clone({
              setHeaders: {
                'Content-Type': 'application/json',
                'bajaj-authorization-token': newToken
              }
            });
            return next(retryReq);
          }),
          catchError(err => {
            securityApi.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
