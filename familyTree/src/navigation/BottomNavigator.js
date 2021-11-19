import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {COLORS} from '../constants';
import HomeScreen from '../screens/Home';
import Profile from '../screens/Profile';
import Tree from '../screens/TreeModel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontIsto from 'react-native-vector-icons/Fontisto';
import AddPeople from '../screens/AddPeople';

const Tab = createBottomTabNavigator();
const options = {headerShown: false};

function Bottomtabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Нүүр') {
            return (
              <MaterialCommunityIcons
                name={'home-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Хувийн мэдээлэл') {
            return (
              <FontAwesome name={'user-circle-o'} size={size} color={color} />
            );
          } else if (route.name === 'Ургийн мод') {
            return <FontIsto name={'sourcetree'} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.BASE_COLOR,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Нүүр" component={HomeScreen} options={options} />
      <Tab.Screen name="Ургийн мод" component={Tree} options={options} />
      <Tab.Screen
        name="Хувийн мэдээлэл"
        component={Profile}
        options={options}
      />
      <Tab.Screen name="Хүн нэмэх" component={AddPeople} options={options} />
    </Tab.Navigator>
  );
}

export default Bottomtabs;
