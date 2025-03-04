import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { signIn } from '../redux/actions/authActions';
import { globalStyles } from '../styles';
import type { AppDispatch } from '../redux/store'; // Import typed dispatch

// Define the navigation prop type based on your navigation structure
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  // Add other routes as needed (e.g., ProfileSetup screens)
};

// Type the navigation prop
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const handleLogin = () => {
    dispatch(signIn(email, password));
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Log In</Text>
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
      <Button mode="contained" onPress={handleLogin} style={globalStyles.button}>
        Log In
      </Button>
      <Button onPress={() => navigation.navigate('Signup')}>
        Don’t have an account? Sign Up
      </Button>
      <Text style={globalStyles.secondaryText}>OR</Text>
      <Button mode="outlined" onPress={() => console.log('Google Login')}>
        Continue with Google
      </Button>
      <Button mode="outlined" onPress={() => console.log('Apple Login')}>
        Continue with Apple
      </Button>
    </View>
  );
};

export default LoginScreen;
