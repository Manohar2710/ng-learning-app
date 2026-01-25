import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      if(err.status === 401) {
        console.error("Unauthorized please login");

      } else if(err.status > 500) {
        // Internal server error
      }
      console.error("[Interceptor] Error", err);
      return throwError(() => new Error(err));
    })
  );
};
