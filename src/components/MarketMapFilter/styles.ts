import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  filterContainer: {
    position: 'absolute',
    top: 48,
    left: 10,
    right: 10,
    display: 'flex',
    gap: 8,
  },
  searchInputTextContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  searchInputTextInput: {
    height: 34,
    flex: 1
  },
  quickFilterContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf:'flex-end',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingHorizontal: 12
  }
})