export interface ApiMarket {
  adresse: string;
  lat: number;
  lon: number;
  commune?: string;
  type?: string;
  identifiant?: number;
  horaires?: string[];
}
