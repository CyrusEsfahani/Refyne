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