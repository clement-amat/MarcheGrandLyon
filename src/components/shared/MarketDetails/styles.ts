import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 8, // For Android
    shadowColor: 'rgba(0, 0, 0, 0.2)', // For iOS
    shadowOffset: { width: 0, height: 12 }, // For iOS
    shadowOpacity: 0.28, // For iOS
    shadowRadius: 28, // For iOS
    borderWidth: 1, // For iOS inset shadow
    borderColor: 'rgba(255, 255, 255, 0.05)', // For iOS inset shadow
  },
  header: {
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16
  }
})