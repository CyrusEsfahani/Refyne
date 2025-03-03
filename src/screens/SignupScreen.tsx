import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/actions/authActions';

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const handleSignup = () => {
    dispatch(signUp(email, password) as any);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput label="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10 }} />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleSignup}>
        Sign Up
      </Button>
      <Button onPress={() => navigation.navigate('Login')}>Go to Login</Button>
    </View>
  );
};

export default SignupScreen;