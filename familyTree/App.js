import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import Bottomtabs from './src/navigation/BottomNavigator';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return <StackNavigator />;
};

export default App;
