import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptorFn } from './interceptor/http-client.interceptor';
import { CustomErrorHandler } from './error-handler/error.handler';
import { MessageService } from './services/message/message.service';
import { CountriesListService } from './services/countries-list/countries-list.service';

export const CoreProviders = [
 provideHttpClient(withInterceptors([httpInterceptorFn])),
 CustomErrorHandler,
  MessageService,
  CountriesListService
];