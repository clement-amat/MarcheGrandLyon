import { Platform, StatusBar, StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  list: {
    paddingTop: 16,
  },
  listItem: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});
