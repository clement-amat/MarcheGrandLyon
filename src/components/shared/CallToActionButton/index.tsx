import React from 'react';
import { Button } from 'react-native-ui-lib';
import { DefaultTheme } from '../../../styles/default-theme';

export function CallToActionButton(props: {
  onPress: () => void;
  title: string;
}) {
  return (
    <Button
      backgroundColor={DefaultTheme.primary}
      label={props.title}
      onPress={props.onPress}
    ></Button>
  );
}
