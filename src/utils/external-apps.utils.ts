import { Linking, Platform } from 'react-native';
import { Market } from '../models/data/market.model';

export const openMarketInMapApplication = (selectedMarket: Market): void => {
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  });
  const latLng = `${selectedMarket.lat},${selectedMarket.lon}`;
  const label = selectedMarket.address;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  Linking.openURL(url);
};
