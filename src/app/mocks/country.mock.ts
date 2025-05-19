import { Country } from '../interface/country.interface';

export const COUNTRIESMOCK: Country[] = [
  {
    id: '1',
    name: { common: 'Argentina' },
    region: 'America',
    subregion: 'South America',
    startOfWeek: 'monday',
    capital: ['Buenos aires'],
    status: 'officially-assigned',
    ccn3: '408'
  },
  {
    id: '2',
    name: { common: 'Nigeria' },
    region: 'Africa',
    subregion: 'Western Africa',
    startOfWeek: 'monday',
    capital: ['Buenos aires'],
    status: 'officially-assigned',
    ccn3: '403'
  }
];
