import { StyleSheet } from 'react-native';
import { DefaultTheme } from '../../../styles/default-theme';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontFamily: 'NotoSans_400Regular',
  },
  header: {
    marginBottom: 8,
  },
  headerAddress: {
    fontSize: 16,
    fontWeight: '800',
  },
  headerCity: {
    fontSize: 14,
  },
  schedule: {
    borderColor: DefaultTheme.secondary,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
});
