import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer my-token-here'
    }
  });

  console.log('Outgoing request to:', req.url);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      // Handle specific HTTP Status Codes
      if (error.status === 401) {
        errorMessage = 'Unauthorized: Please login again.';
        // Optional: router.navigate(['/login']);
      } else if (error.status === 404) {
        errorMessage = `Resource not found: ${error.url}`;
      } else if (error.status === 500) {
        errorMessage = 'Server-side error. Please try again later.';
      }

      console.error(`[Error Interceptor]: ${errorMessage}`, error);

      // Return the error back to the service/component that called it
      return throwError(() => new Error(errorMessage));
    })
  );
};
