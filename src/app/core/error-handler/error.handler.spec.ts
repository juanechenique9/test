import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CustomErrorHandler } from "./error.handler";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MessageService } from "../services/message/message.service";

describe('CustomErrorHandler', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
    ],
    providers: [
      CustomErrorHandler,
      MessageService, 
    ]
  }));

  beforeEach(() => {
    jest.spyOn(console, 'error').mockReturnValue();
    jest.spyOn(console, 'group').mockReturnValue();
    jest.spyOn(console, 'log').mockReturnValue();
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    const handler: CustomErrorHandler = TestBed.inject(CustomErrorHandler);
    expect(handler).toBeTruthy();
  });

  it('should show HttpErrorResponse ErrorEvent', () => {
    const handler: CustomErrorHandler = TestBed.inject(CustomErrorHandler);
    const errorEvent = new ErrorEvent('Error Event', {
      message: 'Error Test',
    });
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: errorEvent,
      headers: new HttpHeaders,
      status: 0,
      statusText: '',
      url: '',
    });
    handler.handleError(error)
    expect(console.error).toHaveBeenCalledTimes(5);
  });

  it('should show HttpErrorResponse ', () => {
    const handler: CustomErrorHandler = TestBed.inject(CustomErrorHandler);
    const errorEvent = {
      status: 404,
      message: 'Error Test',
    };
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: errorEvent,
      headers: new HttpHeaders,
      status: 0,
      statusText: '',
      url: '',
    });
    handler.handleError(error)
    expect(console.error).toHaveBeenCalledTimes(5);
  });

  it('should show 401 error ', () => {
    const handler: CustomErrorHandler = TestBed.inject(CustomErrorHandler);
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: null,
      headers: new HttpHeaders,
      status: 401,
      statusText: '',
      url: '',
    });
    handler.handleError(error)
    expect(console.error).toHaveBeenCalledTimes(5);
  });

  it('should show 412 error ', () => {
    const handler: CustomErrorHandler = TestBed.inject(CustomErrorHandler);
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: null,
      headers: new HttpHeaders,
      status: 412,
      statusText: '',
      url: '',
    });
    handler.handleError(error)
    expect(console.error).toHaveBeenCalledTimes(5);
  });


});
