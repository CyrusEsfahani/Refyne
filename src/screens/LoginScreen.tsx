import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions/authActions';
import { globalStyles } from '../styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(signIn(email, password) as any);
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