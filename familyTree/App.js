import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import Bottomtabs from './src/navigation/BottomNavigator';
import StackNavigator from './src/navigation/StackNavigator';
import {NativeBaseProvider} from 'native-base';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <NativeBaseProvider>
      <DrawerNavigator />
    </NativeBaseProvider>
  );
};

export default App;
