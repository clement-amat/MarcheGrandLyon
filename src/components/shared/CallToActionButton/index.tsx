import { Pressable, Text } from 'react-native';
import { style } from './styles';
import React from 'react';

export function CallToActionButton(props: {
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [pressed ? style.pressedCta : {}, style.cta]}
    >
      <Text style={style.ctaText}>{props.title}</Text>
    </Pressable>
  );
}
