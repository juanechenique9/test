import { TableHeader, TableRow } from '../interface/table.interface';

export const TABLEMOCKROW: TableRow[] = [
  {
    id: '1',
    columns: [
      { headerId: 'name', primaryText: 'Argentina' },
      { headerId: 'region', primaryText: 'America' },
    ],
    code: '120'
  },
  {
    id: '2',
    columns: [
      { headerId: 'name', primaryText: 'Nigeria' },
      { headerId: 'region', primaryText: 'Africa' },
    ],
    code: '130'
  },
];

export const TABLEMOCKHEADER: TableHeader[] = [
  { id: 'name', label: 'Country Name' },
  { id: 'region', label: 'Region' },
];
