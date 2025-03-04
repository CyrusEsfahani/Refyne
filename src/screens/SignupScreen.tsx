import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/actions/authActions';
import { globalStyles } from '../styles';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = () => {
    dispatch(signUp(email, password) as any);
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