import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailComponent } from './country-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { CountriesListService } from '../../core/services/countries-list/countries-list.service';
import { COUNTRIESMOCK } from '../../mocks/country.mock';
import { of } from 'rxjs';
import {
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  runInInjectionContext,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CountryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'AR',
              },
            },
          },
        },
        {
          provide: CountriesListService,
          useValue: {
            getCountryDetail: jest.fn().mockReturnValue(of(COUNTRIESMOCK)),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;

    runInInjectionContext(TestBed, () => {
      (component as any).country$ = of(COUNTRIESMOCK);
      (component as any).country = toSignal((component as any).country$, {
        initialValue: [],
      });
      (component as any).fillRowsTable = computed(() =>
        (component as any).fillRow((component as any).country())
      );
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate table rows from country signal', () => {
    const rows = component.fillRowsTable();
    expect(rows.length).toBe(2);
    expect(rows[0].columns[0].primaryText).toBe('Argentina');
  });
});
