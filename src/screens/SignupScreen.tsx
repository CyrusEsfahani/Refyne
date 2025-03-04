import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { signUp } from '../redux/actions/authActions';
import { globalStyles } from '../styles';
import type { AppDispatch } from '../redux/store';

// Define the navigation prop type based on your navigation structure
type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  // Add other routes as needed (e.g., ProfileSetup screens)
};

// Type the navigation prop
type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: { navigation: SignupScreenNavigationProp }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const handleSignup = () => {
    dispatch(signUp(email, password));
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Create Your Account</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={globalStyles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={globalStyles.input}
      />
      <Button mode="contained" onPress={handleSignup} style={globalStyles.button}>
        Sign Up
      </Button>
      <Button onPress={() => navigation.navigate('Login')}>
        Already have an account? Log In
      </Button>
    </View>
  );
};

export default SignupScreen;
