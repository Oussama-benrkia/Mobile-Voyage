import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
}));

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });

      const { token } = response.data;
      await AsyncStorage.setItem('jwt_token', token);
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={classes.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        style={classes.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={classes.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button
        style={classes.button}
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};

export default LoginScreen;