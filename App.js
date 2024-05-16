import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainContainer from "./src/MainContainer";
import Register from "./src/Register";
import Login from "./src/Login";
import VoyageDetailsScreen from './src/screens/VoyageDetailsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainContainer" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Register} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="VoyageDetailsScreen" component={VoyageDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;