import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import SideMenu from '../components/SideMenu';
import Login from '../screens/Login';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();
function DrawerNavigator(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{drawerStyle: {borderTopRightRadius: 50}}}
          edgeWidth={50}
          drawerContent={props => <SideMenu {...props} />}
          drawerStyle={style.drawer}>
          <Drawer.Screen
            name="Stack"
            component={StackNavigator}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default DrawerNavigator;

const style = StyleSheet.create({
  drawer: {
    width: '100%',
    // borderTopRightRadius: 50,
  },
});
