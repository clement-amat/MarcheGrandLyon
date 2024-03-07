import { ApiMarket } from '../models/data/market.api';
import data from './../../assets/data/data.json';
import { getDayName } from '../utils/date.utils';
import { Market, MarketSchedule } from '../models/data/market.model';
import { MarketMapper } from '../models/mappers/market.mapper';

export const getMarkets = (
  searchTerm?: string,
  onlyToday?: boolean,
): Market[] => {
  const marketList: { values: ApiMarket[] } = data;
  let markets: Market[] = new MarketMapper().apisToModels(marketList.values);

  if (onlyToday) {
    const today = getDayName();
    markets = markets.filter((item) =>
      (item.schedules || []).find((schedule: MarketSchedule) =>
        today.startsWith(schedule.weekDay.toLowerCase().substring(0, 2)),
      ),
    );
  }

  if (searchTerm) {
    markets = markets.filter((item) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        item.address.toLowerCase().includes(searchTermLowerCase) ||
        item.address?.toLowerCase().includes(searchTermLowerCase)
      );
    });
  }

  return markets;
};
