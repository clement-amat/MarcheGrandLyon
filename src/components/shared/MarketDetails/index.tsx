import React from 'react';
import { Text, View } from 'react-native';
import { Market } from '../../../models/data/market.model';
import { style } from './styles';

export interface MarketDetailsProps {
  market: Market
}

export default function MarketDetails(props: MarketDetailsProps) {
  const market: Market = props.market;

  return <View  style={style.container}>
    <View
      style={style.header}
    >
      <Text style={style.headerText}>{market?.adresse} </Text>
      <Text style={style.headerText}>{market?.commune}</Text>
    </View>
    <Text>Marché {market?.type}</Text>
    <Text>Le {market.horaires?.map((horaire) => horaire ).join(', ')}</Text>
  </View>
}