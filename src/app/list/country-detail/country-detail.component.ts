import { Component, computed, inject } from '@angular/core';
import { CountriesListService } from '../../core/services/countries-list/countries-list.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../interface/country.interface';

@Component({
  selector: 'app-country-detail',
  standalone: false,
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  private route = inject(ActivatedRoute);
  private CountriesListService = inject(CountriesListService);
  private country$ = this.CountriesListService.getCountryDetail(
    this.route.snapshot.paramMap.get('code')
  );

  readonly country = toSignal(this.country$, { initialValue: [] });

  readonly fillRowsTable = computed(() => this.fillRow(this.country()));

  readonly tableHeaders = [
    { id: 'name', label: 'Nombre del país' },
    { id: 'region', label: 'Región' },
    { id: 'subRegion', label: 'Sub Región' },
    { id: 'startOfWeek', label: 'Inicio de semana' },
    { id: 'capital', label: 'Capital' },
    { id: 'status', label: 'Estado' },
  ];

  fillRow(rows: Country[]) {
    return (
      rows.map((item) => ({
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
          {
            headerId: 'startOfWeek',
            primaryText: item.startOfWeek,
          },
          {
            headerId: 'capital',
            primaryText: item.capital[0].toString(),
          },
          {
            headerId: 'status',
            primaryText: item.status,
          },
        ],
      })) ?? []
    );
  }
}
