import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#FF0000', // Red
  background: '#FFFFFF', // White
  text: '#000000', // Black
  secondaryText: '#808080', // Gray
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    padding: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: colors.secondaryText,
    fontSize: 14,
    marginTop: 10,
  },
});
const styles = StyleSheet.create({
    exerciseItem: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    selectedItem: {
      backgroundColor: '#e0e0e0',
    },
    exerciseIcon: {
      width: 80,
      height: 80,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c2c2e', // Dark background for placeholder
    },
    noImageText: {
      color: '#ccc',
      fontSize: 12,
      textAlign: 'center',
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    exerciseDetail: {
      fontSize: 14,
      color: '#666',
    },
    listContent: {
      paddingBottom: 20,
    },
  });