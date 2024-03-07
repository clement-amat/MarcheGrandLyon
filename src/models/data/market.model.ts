export interface Market {
  address: string;
  lat: number;
  lon: number;
  city?: string;
  schedules?: MarketSchedule[];
}

export interface MarketSchedule {
  type?: MarketType;
  weekDay?: string;
  time: string;
}

export enum MarketType {
  FOOD = 'FOOD',
  MIXED = 'MIXED',
}
