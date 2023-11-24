export interface Market {
  adresse: string;
  lat: number;
  lon: number;
  commune?: string;
  type?: string;
  identifiant?: string;
  horaires?: string[]
}