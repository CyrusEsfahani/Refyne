import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions/authActions';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(signIn(email, password) as any);
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
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Signup')}>Go to Signup</Button>
    </View>
  );
};

export default LoginScreen;