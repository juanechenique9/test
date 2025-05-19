import { TestBed } from '@angular/core/testing';

import { CountriesListService } from '../../../../app/core/services/countries-list/countries-list.service';
import { API_URL } from '../../../app.tokens';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { COUNTRIESMOCK } from '../../../mocks/country.mock';
import { BehaviorSubject, of } from 'rxjs';
import { CustomErrorHandler } from '../../error-handler/error.handler';

describe('CountriesListService', () => {
  let service: CountriesListService;
  let httpMock: HttpTestingController;
  const mockErrorHandler = {
    handleError: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CountriesListService,
        { provide: CustomErrorHandler, useValue: mockErrorHandler },
        { provide: API_URL, useValue: 'https://restcountries.com/v3.1/' },
      ],
    });
    service = TestBed.inject(CountriesListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return countries from getCountriesList', () => {
    service.getCountriesList().subscribe((res) => {
      expect(res).toEqual(COUNTRIESMOCK);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush(COUNTRIESMOCK);
  });

  it('should return countries from getCountriesListByName', () => {
    service.getCountriesListByName('Argentina').subscribe((res) => {
      expect(res).toEqual(COUNTRIESMOCK);
    });

    const req = httpMock.expectOne(
      'https://restcountries.com/v3.1/name/Argentina'
    );
    expect(req.request.method).toBe('GET');
    req.flush(COUNTRIESMOCK);
  });

  it('should return countries from getListCountryByRegion', () => {
    service.getListCountryByRegion('africa').subscribe((res) => {
      expect(res).toEqual(COUNTRIESMOCK[1]);
    });

    const req = httpMock.expectOne(
      'https://restcountries.com/v3.1/region/africa'
    );
    expect(req.request.method).toBe('GET');
    req.flush(COUNTRIESMOCK[1]);
  });

  it('should call getFilteredCountries with the latest values from filters$', (done) => {
    const spy = jest
      .spyOn(service, 'getFilteredCountries')
      .mockReturnValue(of([]));
    const filters$ = new BehaviorSubject<[string | null, string | null]>([
      'colombia',
      null,
    ]);

    service.search(filters$).subscribe(() => {
      expect(spy).toHaveBeenCalledWith('colombia', null);
      done();
    });
  });

  it('should call getCountriesListByName if name is provided', () => {
    const spy = jest
      .spyOn(service, 'getCountriesListByName')
      .mockReturnValue(of([]));
    const region = null;
    const name = 'argentina';

    service.getFilteredCountries(name, region!).subscribe();

    expect(spy).toHaveBeenCalledWith(name);
  });

  it('should call getListCountryByRegion if name is not provided but region is', () => {
    const spy = jest
      .spyOn(service, 'getListCountryByRegion')
      .mockReturnValue(of([]));
    const region = 'america';
    const name = '';

    service.getFilteredCountries(name, region).subscribe();

    expect(spy).toHaveBeenCalledWith(region);
  });

  it('should call getCountriesList if neither name nor region is provided', () => {
    const spy = jest.spyOn(service, 'getCountriesList').mockReturnValue(of([]));
    const region = '';
    const name = '';

    service.getFilteredCountries(name, region).subscribe();

    expect(spy).toHaveBeenCalled();
  });

  it('should return [] and call handleError on getCountriesListByName error', () => {
    service.getCountriesListByName('Argentina').subscribe((res) => {
      expect(res).toEqual([]);
      expect(mockErrorHandler.handleError).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(
      'https://restcountries.com/v3.1/name/Argentina'
    );
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should fetch country detail by code', () => {
    const code = '120';

    service.getCountryDetail(code).subscribe((res) => {
      expect(res).toEqual(COUNTRIESMOCK);
    });

    const req = httpMock.expectOne(`${service['url']}alpha/${code}`);
    expect(req.request.method).toBe('GET');
    req.flush(COUNTRIESMOCK);
  });
});
