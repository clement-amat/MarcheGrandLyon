import { ApiMarket } from '../data/market.api';
import { Market, MarketType } from '../data/market.model';
import { groupBy } from 'lodash';
import { Dictionary } from 'react-native-ui-lib/src/typings/common';

export class MarketMapper {
  apiWithSameAddressToModel(apis: ApiMarket[]): Market {
    const api: ApiMarket = apis[0];
    return {
      lon: api.lon,
      lat: api.lat,
      address: api.adresse,
      city: api.commune,
      schedules: apis.map((apiItem) => ({
        time: apiItem.horaires[0],
        weekDay: apiItem.horaires[0],
        type: MarketType[apiItem.type],
      })),
    };
  }

  apisToModels(apis: ApiMarket[]): Market[] {
    const marketsGroupedByAddress: Dictionary<ApiMarket[]> = groupBy(
      apis,
      (api: ApiMarket) => api.adresse,
    );

    return Object.keys(marketsGroupedByAddress).map((address) =>
      this.apiWithSameAddressToModel(marketsGroupedByAddress[address]),
    );
  }
}
