import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import HomeScreen from '../screens/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {COLORS} from '../constants';
import Tree from '../screens/TreeModel';
import Profile from '../screens/Profile';
import Bottomtabs from './BottomNavigator';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const options = {
    headerShown: false,
    animation: 'fade_from_bottom',
  };
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={options} />
        <Stack.Screen name="Register" component={Register} options={options} />
        {/* <Stack.Screen name="Home" component={HomeScreen} options={options} />
          <Stack.Screen name="Profile" component={Profile} options={options} />
          <Stack.Screen name="TreeModel" component={Tree} options={options} /> */}
        <Stack.Screen name="Bottom" component={Bottomtabs} options={options} />
        {/*<Stack.Screen name="Drawer" component={DrawerNavigator} />*/}
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default StackNavigator;
