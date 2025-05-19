export interface Country {
  id: string;
  name: {common: string};
  region: string;
  subregion: string;
  ccn3: string;
  startOfWeek: string;
  capital: string[];
  status: string;
}