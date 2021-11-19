import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import Bottomtabs from './src/navigation/BottomNavigator';
import StackNavigator from './src/navigation/StackNavigator';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <NativeBaseProvider>
      <StackNavigator />
    </NativeBaseProvider>
  );
};

export default App;
