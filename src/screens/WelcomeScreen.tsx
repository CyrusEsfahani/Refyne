import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { globalStyles, colors } from '../styles';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.title, { color: colors.primary }]}>Refyne</Text>
      <Text style={globalStyles.title}>Welcome</Text>
      <Text style={globalStyles.secondaryText}>
        Get started with your fitness journey!
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={globalStyles.button}
      >
        Log In
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Signup')}
        style={globalStyles.button}
      >
        Sign Up
      </Button>
    </View>
  );
};

export default WelcomeScreen;