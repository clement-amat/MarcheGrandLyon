import { StyleSheet } from 'react-native';
import { DefaultTheme } from '../../../styles/default-theme';

export const style = StyleSheet.create({
  cta: {
    flex: 1,
    position: 'relative',
    backgroundColor: DefaultTheme.primary,
    marginTop: 8,
    borderRadius: 100,
  },
  pressedCta: {
    backgroundColor: DefaultTheme.secondary,
  },
  ctaText: {
    color: 'white',
    padding: 8,
    textAlign: 'center',
  },
});
