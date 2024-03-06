import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  marketDetail: {
    position: 'absolute',
    bottom: 16,
    left: 10,
    right: 10,
  },
});
