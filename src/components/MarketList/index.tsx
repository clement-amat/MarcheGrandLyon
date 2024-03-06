import React, { useEffect, useState } from 'react';

import { FlatList, View } from 'react-native';
import MarketDetails from '../shared/MarketDetails';
import { getMarkets } from '../../services/market.service';
import { Market } from '../../models/data/market.model';
export default function MarketList() {
  const [marketList, setMarketList] = useState<Market[]>([]);

  const updatedMarketList = (): void => {
    setMarketList(getMarkets());
  };
  useEffect(() => {
    updatedMarketList();
  }, []);

  return (
    <View>
      <FlatList
        data={marketList}
        renderItem={({ item }) => <MarketDetails market={item} />}
        keyExtractor={(item) => item.identifiant}
      />
    </View>
  );
}
