import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { Market } from '../../../models/data/market.model';
import { style } from './styles';

export interface MarketDetailsProps extends PropsWithChildren {
  market: Market;
}

export default function MarketDetails(props: MarketDetailsProps) {
  const market: Market = props.market;

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerAddress}>{market?.adresse} </Text>
        <Text style={style.headerCity}>{market?.commune}</Text>
      </View>
      <Text>Marché {market?.type}</Text>
      <Text>Le {market.horaires?.map((horaire) => horaire).join(', ')}</Text>
      {props.children && <View>{props.children}</View>}
    </View>
  );
}
