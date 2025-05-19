import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomErrorHandler } from '../error-handler/error.handler';

export const httpInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const errorHandler = inject(CustomErrorHandler);

  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
       if (error.status === 404) {
      return throwError(() => error);
    }
    errorHandler.handleError(error);
    return throwError(() => error);
    })
  );
};