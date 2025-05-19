import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { API_URL } from './app.tokens';
import { HttpClientModule } from '@angular/common/http';
import { CoreProviders } from './core/core.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {provide: API_URL, useValue: 'https://restcountries.com/v3.1/'},
    importProvidersFrom(HttpClientModule),
    ...CoreProviders
  ],
};
