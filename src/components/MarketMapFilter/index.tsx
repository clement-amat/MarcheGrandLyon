import { style } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export function MarketMapFilter(props: {
  onSearchTermChanged: (searchTermInput: string) => void;
  searchTerm: string;
  onClearSearchTerm: () => void;
  onTodayQuickFilterValueChanged: () => void;
  todayFilterActive: boolean;
}) {
  return (
    <SafeAreaView style={style.filterContainer}>
      <View style={style.searchInputTextContainer}>
        <Ionicons name="search" size={24} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <TextInput
            style={style.searchInputTextInput}
            placeholder="Rechercher"
            onChangeText={props.onSearchTermChanged}
            value={props.searchTerm}
          ></TextInput>
        </TouchableWithoutFeedback>
        {props.searchTerm?.length > 0 && (
          <TouchableOpacity>
            <Ionicons
              onPress={props.onClearSearchTerm}
              name="ios-close-circle"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={style.quickFilterContainer}
        activeOpacity={1}
        onPress={props.onTodayQuickFilterValueChanged}
      >
        <Text>Aujourdhui</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={props.todayFilterActive ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={props.onTodayQuickFilterValueChanged}
          value={props.todayFilterActive}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
