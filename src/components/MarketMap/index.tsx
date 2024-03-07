import React, { useCallback, useEffect, useState } from 'react';

import { Animated, Keyboard, View } from 'react-native';
import MapView from 'react-native-map-clustering';

import { Marker, MarkerPressEvent } from 'react-native-maps';
import { style } from './styles';
import MarketDetails from '../shared/MarketDetails';
import { getMarkets } from '../../services/market.service';
import { MarketMapFilter } from '../MarketMapFilter';
import { DefaultTheme } from '../../styles/default-theme';
import { CallToActionButton } from '../shared/CallToActionButton';
import { openMarketInMapApplication } from '../../utils/external-apps.utils';
import { Market } from '../../models/data/market.model';

export default function MarketMap() {
  const SELECTED_MARKER = require('../../../assets/marker_selected.png');
  const DEFAULT_MARKER = require('../../../assets/marker.png');

  const [marketList, setMarketList] = useState<Market[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialRegion, setInitialRegion] = useState<any>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market>(null);
  const [marketDetailsAnimation] = useState(new Animated.Value(0));
  const [todayFilterActive, setTodayFilterActive] = useState(false);

  const updatedMarketList = useCallback((): void => {
    setMarketList(getMarkets(searchTerm, todayFilterActive));
  }, [searchTerm, todayFilterActive]);

  const showMarketDetails = () => {
    Animated.parallel([
      Animated.timing(marketDetailsAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideMarketDetails = useCallback(() => {
    Animated.parallel([
      Animated.timing(marketDetailsAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setSelectedMarket(null));
  }, [marketDetailsAnimation]);
  const onMarkerPressed = (event: MarkerPressEvent, market: Market): void => {
    event.preventDefault();
    setSelectedMarket(market);
    showMarketDetails();
  };

  const onClearSearchTermPressed = (): void => {
    setSearchTerm(null);
    Keyboard.dismiss();
  };

  const onTodayQuickFilterValueChanged = (): void => {
    setTodayFilterActive(!todayFilterActive);
  };

  const onMapViewPressed = (): void => {
    setSelectedMarket(null);
  };

  const onSearchTermChanged = (searchTermInput: string): void => {
    if (searchTermInput !== searchTerm) {
      setSearchTerm(searchTermInput);
    }
  };

  const onCTAPressed = (): void => {
    openMarketInMapApplication(selectedMarket);
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
  }, [hideMarketDetails, selectedMarket]);

  useEffect(() => {
    updatedMarketList();
  }, [updatedMarketList, searchTerm, todayFilterActive]);

  const interpolatedTranslateY = marketDetailsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={style.container}>
      <MarketMapFilter
        onSearchTermChanged={onSearchTermChanged}
        searchTerm={searchTerm}
        onClearSearchTerm={onClearSearchTermPressed}
        onTodayQuickFilterValueChanged={onTodayQuickFilterValueChanged}
        todayFilterActive={todayFilterActive}
      />
      {initialRegion && (
        <MapView
          style={style.map}
          initialRegion={initialRegion}
          onPress={onMapViewPressed}
          clusterColor={DefaultTheme.primary}
        >
          {marketList.map((market: Market) => (
            <Marker
              key={market.address}
              tracksViewChanges={false}
              coordinate={{ latitude: market.lat, longitude: market.lon }}
              image={
                market.address === selectedMarket?.address
                  ? SELECTED_MARKER
                  : DEFAULT_MARKER
              }
              onPress={(event: MarkerPressEvent) =>
                onMarkerPressed(event, market)
              }
            ></Marker>
          ))}
        </MapView>
      )}
      {selectedMarket && (
        <Animated.View
          style={{
            ...style.marketDetail,
            opacity: marketDetailsAnimation,
            transform: [{ translateY: interpolatedTranslateY }],
          }}
        >
          <MarketDetails market={selectedMarket}>
            <View style={style.cta}>
              <CallToActionButton title="M'y rendre" onPress={onCTAPressed} />
            </View>
          </MarketDetails>
        </Animated.View>
      )}
    </View>
  );
}
