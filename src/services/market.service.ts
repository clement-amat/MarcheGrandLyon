import { Market } from '../models/data/market.model';
import data from './../../assets/data/data.json';
import { getDayName } from '../utils/date.utils';

const getGroupedMarketsByAddress = (marketList: { values: Market[] }): Market[] => {
  return marketList.values.reduce((acc: Market[], value: Market) => {
    const itemWithSameAddress = acc.find((item => item.adresse === value.adresse));
    if (!itemWithSameAddress) {
      acc.push(value)
    } else {
      itemWithSameAddress.horaires = Array.from(new Set([...itemWithSameAddress.horaires, ...value.horaires]));
    }
    return acc;
  }, []);
}

export const getMarkets = (searchTerm?: string, onlyToday?: boolean): Market[] => {
  const marketList: {values: Market[]} = data;
  let cleanedList = getGroupedMarketsByAddress(marketList);

  if (onlyToday) {
    const today = getDayName();
    cleanedList = cleanedList.filter((item => (item.horaires || []).find(horaire => today.startsWith(horaire.toLowerCase().substring(0, 2)))))
  }

  if (searchTerm) {
    cleanedList = cleanedList.filter(item => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return item.adresse.toLowerCase().includes(searchTermLowerCase) || item.commune?.toLowerCase().includes(searchTermLowerCase)
    })
  }

  return cleanedList;
}