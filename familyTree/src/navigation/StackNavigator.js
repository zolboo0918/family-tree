import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import HomeScreen from '../screens/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {COLORS} from '../constants';
import Tree from '../screens/TreeModel';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const options = {
    headerShown: false,
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.BASE_COLOR} />
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={options} />
          <Stack.Screen
            name="Register"
            component={Register}
            options={options}
          />
          <Stack.Screen name="Home" component={HomeScreen} options={options} />
          <Stack.Screen name="TreeModel" component={Tree} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default StackNavigator;
