import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CountriesListService } from '../../core/services/countries-list/countries-list.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { Country } from '../../interface/country.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { SelectOption } from '../../interface/select-option';
import { TableRow } from '../../interface/table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries-list',
  standalone: false,
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesListComponent {
  private router = inject(Router);
  private CountriesListService = inject(CountriesListService);

  form = new FormGroup({
    region: new FormControl(''),
    searchControl: new FormControl(''),
  });

  private filters$ = combineLatest([
    this.form.controls['searchControl'].valueChanges.pipe(startWith('')),
    this.form.controls['region'].valueChanges.pipe(startWith('')),
  ]);

  private countries$ = this.CountriesListService.search(this.filters$);

  readonly countriesList = toSignal(this.countries$, { initialValue: [] });

  readonly fillRowsTable = computed(() => this.fillRow(this.countriesList()));

  readonly allCountries$ = this.CountriesListService.getCountriesList().pipe(
    shareReplay(1)
  );

  readonly regions = toSignal(
    this.allCountries$.pipe(
      map((countries) => {
        const uniqueRegions = [...new Set(countries.map((c) => c.region))]
          .filter((r) => !!r)
          .sort();

        return uniqueRegions.map(
          (region): SelectOption => ({ label: region, value: region })
        );
      })
    ),
    { initialValue: [] }
  );

  readonly tableHeaders = [
    { id: 'name', label: 'Nombre del país' },
    { id: 'region', label: 'Región' },
    { id: 'subRegion', label: 'Sub Región' },
  ];

  fillRow(rows: Country[]) {
    return (
      rows?.map((item) => ({
        id: item.id,
        code: item.ccn3,
        columns: [
          {
            headerId: 'name',
            primaryText: item.name.common,
          },
          {
            headerId: 'region',
            primaryText: item.region,
          },
          {
            headerId: 'subRegion',
            primaryText: item.subregion,
          },
        ],
      })) ?? []
    );
  }

  goToDetail(row: TableRow) {
    this.router.navigate(['/countries', row.code]);
  }
}
