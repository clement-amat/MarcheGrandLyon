import React, { useEffect, useState } from 'react';

import { Animated, Keyboard, View } from 'react-native';
import MapView from "react-native-map-clustering";

import { Marker } from 'react-native-maps';

import { style } from './styles';
import { Market } from '../../models/data/market.model';
import MarketDetails from '../shared/MarketDetails';
import { getMarkets } from '../../services/market.service';
import { MarketMapFilter } from '../MarketMapFilter';

export default function MarketMap() {
  const SELECTED_MARKER = require('../../../assets/marker_selected.png')
  const DEFAULT_MARKER = require('../../../assets/marker.png')

  const [marketList, setMarketList] = useState<Market[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialRegion, setInitialRegion] = useState<any>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market>(null);
  const [marketDetailsAnimation] = useState(new Animated.Value(0));
  const [todayFilterActive, setTodayFilterActive] = useState(false);
  const onMarkerPressed = (event, market: Market): void => {
    event.preventDefault();
    setSelectedMarket(market);
    showMarketDetails();
  }

  const onClearSearchTermPressed = (): void => {
    setSearchTerm(null);
    Keyboard.dismiss();
  }

  const onTodayQuickFilterValueChanged = (): void => {
    setTodayFilterActive(!todayFilterActive);
  }

  const onMapViewPressed = (): void => {
    setSelectedMarket(null);
  }

  const onSearchTermChanged = (searchTermInput: string): void => {
    if (searchTermInput !== searchTerm) {
      setSearchTerm(searchTermInput)
    }
  }

  const updatedMarketList = (): void => {
    setMarketList(getMarkets(searchTerm, todayFilterActive));
  }

  const showMarketDetails = () => {
    Animated.parallel([
      Animated.timing(marketDetailsAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(marketDetailsAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const hideMarketDetails = () => {
    Animated.parallel([
      Animated.timing(marketDetailsAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(marketDetailsAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => setSelectedMarket(null));
  };

  useEffect(() => {
    setMarketList(getMarkets());
    setInitialRegion({
      latitude: 45.75,
      longitude: 4.85,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }, []);

  useEffect(() => {
    if (!selectedMarket) {
      hideMarketDetails();
    }
  }, [selectedMarket]);

  useEffect(() => {
    updatedMarketList();
  }, [searchTerm, todayFilterActive]);

  const interpolatedTranslateY = marketDetailsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={style.container}>
      <MarketMapFilter
        onSearchTermChanged={onSearchTermChanged} searchTerm={searchTerm} onClearSearchTerm={onClearSearchTermPressed}
        onTodayQuickFilterValueChanged={onTodayQuickFilterValueChanged} todayFilterActive={todayFilterActive}/>
      {initialRegion && (<MapView style={style.map} initialRegion={initialRegion} onPress={onMapViewPressed}>
        {marketList.map((market: Market) => (
          <Marker
            key={market.identifiant}
            tracksViewChanges={false}
            coordinate={{latitude: market.lat, longitude: market.lon}}
            image={market.identifiant === selectedMarket?.identifiant ? SELECTED_MARKER : DEFAULT_MARKER}
            onPress={(event) => onMarkerPressed(event, market)}
          >
          </Marker>
        ))}
      </MapView>)}
      {selectedMarket && (<Animated.View style={{
        ...style.marketDetail,
        opacity: marketDetailsAnimation,
        transform: [{translateY: interpolatedTranslateY}],
      }}>
        <MarketDetails market={selectedMarket}/>
      </Animated.View>)}
    </View>
  );
}
