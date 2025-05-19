import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesListComponent } from '../../../app/list/countries-list/countries-list.component';
import { CountriesListService } from '../../core/services/countries-list/countries-list.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { COUNTRIESMOCK } from '../../mocks/country.mock';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TABLEMOCKROW } from '../../mocks/table.mock';

describe('ListCountryComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      declarations: [CountriesListComponent],
      providers: [
        {
          provide: CountriesListService,
          useValue: {
            getCountriesList: jest.fn().mockReturnValue(of(COUNTRIESMOCK)),
            search: jest.fn().mockReturnValue(of(COUNTRIESMOCK)),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate unique region options from country list', () => {
    fixture.detectChanges();

    const result = component.regions();

    expect(result).toEqual([
      { label: 'Africa', value: 'Africa' },
      { label: 'America', value: 'America' },
    ]);
  });

  it('should update countriesList when form controls change', () => {
    fixture.detectChanges();

    component.form.controls['searchControl'].setValue('Argentina');
    component.form.controls['region'].setValue('America');

    fixture.detectChanges();

    expect(component.countriesList()).toEqual(COUNTRIESMOCK);
  });

  it('should navigate to url', () => {
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));
    jest.spyOn(router, 'url', 'get').mockReturnValue('/countries/');
    component.goToDetail(TABLEMOCKROW[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/countries', '120']);
  });
});
