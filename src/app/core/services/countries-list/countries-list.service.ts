import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomErrorHandler } from '../../error-handler/error.handler';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { API_URL } from '../../../app.tokens';
import { Country } from '../../../interface/country.interface';

@Injectable()
export class CountriesListService {
  private url = inject(API_URL);
  private http = inject(HttpClient);

  constructor(private handler: CustomErrorHandler) {}

  getCountriesList(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}all`).pipe(
      map((response: Country[]) => {
        return response;
      })
    );
  }

  getCountriesListByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}name/${name}`).pipe(
      map((response: Country[]) => {
        return response;
      }),
      catchError((error: any) => {
        if (error.status === 404) {
          return of([]);
        }
        this.handler.handleError(error);
        return of([]);
      })
    );
  }

  search(filters$: Observable<[string | null, string | null]>) {
    return filters$.pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => a[0] === b[0] && a[1] === b[1]),
      switchMap(([name, region]) => this.getFilteredCountries(name!, region!))
    );
  }

  getFilteredCountries(name: string, region: string): Observable<Country[]> {
    if (name) {
      return this.getCountriesListByName(name);
    }

    if (region) {
      return this.getListCountryByRegion(region);
    }

    return this.getCountriesList();
  }

  getListCountryByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}region/${region}`).pipe(
      map((response: Country[]) => {
        return response;
      })
    );
  }

  getCountryDetail(code: string | null): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}alpha/${code}`).pipe(
      map((response: Country[]) => {
        return response;
      })
    );
  }
}
