import React, { PropsWithChildren } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { style } from './styles';
import { Card } from 'react-native-ui-lib';
import { Market } from '../../../models/data/market.model';

export interface MarketDetailsProps extends PropsWithChildren {
  market: Market;
}

export default function MarketDetails(props: MarketDetailsProps) {
  const market: Market = props.market;

  return (
    <Card style={style.container}>
      <View style={style.header}>
        <Text style={style.headerAddress}>{market?.address} </Text>
        <Text style={style.headerCity}>{market?.city}</Text>
      </View>
      <Text></Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {market.schedules?.map((schedule) => (
          <View style={style.schedule} key={schedule.weekDay}>
            <Text>{schedule.weekDay}</Text>
          </View>
        ))}
      </ScrollView>
      {props.children && <View>{props.children}</View>}
    </Card>
  );
}
