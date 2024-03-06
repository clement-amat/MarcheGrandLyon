import React, { useEffect, useState } from 'react';

import { FlatList, SafeAreaView, View } from 'react-native';
import MarketDetails from '../shared/MarketDetails';
import { getMarkets } from '../../services/market.service';
import { Market } from '../../models/data/market.model';
import { style } from './styles';

export default function MarketList() {
  const [marketList, setMarketList] = useState<Market[]>([]);

  const updatedMarketList = (): void => {
    setMarketList(getMarkets());
  };
  useEffect(() => {
    updatedMarketList();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        style={style.list}
        data={marketList}
        renderItem={({ item }) => (
          <View style={style.listItem}>
            <MarketDetails market={item} />
          </View>
        )}
        keyExtractor={(item) => item.identifiant}
      />
    </SafeAreaView>
  );
}
