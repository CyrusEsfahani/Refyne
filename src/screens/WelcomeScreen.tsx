import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { globalStyles, colors } from '../styles';
import type { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation parameter list
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

// Type the navigation prop for WelcomeScreen
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
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
