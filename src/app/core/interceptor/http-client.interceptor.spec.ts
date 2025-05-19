import { HttpErrorResponse, HttpEvent, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { of, throwError } from "rxjs";
import { httpInterceptorFn } from "./http-client.interceptor";

jest.mock('@angular/core', () => {
  const original = jest.requireActual('@angular/core');
  return {
    ...original,
    inject: jest.fn(),
  };
});

describe('httpInterceptorFn', () => {
  let mockErrorHandler: { handleError: jest.Mock };

  beforeEach(() => {
    mockErrorHandler = { handleError: jest.fn() };
    (inject as jest.Mock).mockReturnValue(mockErrorHandler);
  });

  it('should add header Content-Type', (done) => {
    const req = new HttpRequest('GET', '/api/test');
    const next = (request: HttpRequest<unknown>) => {
      expect(request.headers.get('Content-Type')).toBe('application/json');
      return of({} as HttpEvent<unknown>);
    };

    httpInterceptorFn(req, next).subscribe(() => done());
  });

  it('should call handleError if error.status != 404', (done) => {
    const req = new HttpRequest('GET', '/api/test');
    const next = () =>
      throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Error' }));

    httpInterceptorFn(req, next).subscribe({
      error: () => {
        expect(mockErrorHandler.handleError).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should not call handleError if error.status is 404', (done) => {
    const req = new HttpRequest('GET', '/api/test');
    const next = () =>
      throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' }));

    httpInterceptorFn(req, next).subscribe({
      error: () => {
        expect(mockErrorHandler.handleError).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
