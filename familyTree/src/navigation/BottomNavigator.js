import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontIsto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants';
import AddPeople from '../screens/AddPeople';
import HomeScreen from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Tree from '../screens/TreeModel';

const Tab = createBottomTabNavigator();
const options = {headerShown: false};

function Bottomtabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: '#fff',
        showIcon: true,
      }}>
      <Tab.Screen
        name="Нүүр"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          headerTitle: 'Нүүр',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {color: '#585858', fontSize: 18},
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
          tabBarIcon: ({color, size}) => (
            <Feather name={'home'} color={color} size={20} />
          ),
          headerRight: () => (
            <FontIsto
              name={'search'}
              size={18}
              color={'#585858'}
              style={{marginRight: 20}}
            />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons
              name={'menu'}
              size={18}
              color={'#585858'}
              style={{marginLeft: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Хайлт"
        component={Search}
        options={{
          tabBarShowLabel: false,
          headerTitle: 'Овог',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {color: '#585858', fontSize: 18},
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
          tabBarIcon: ({color, size}) => (
            <FontIsto name={'search'} size={20} color={color} />
          ),
          headerRight: () => (
            <FontIsto
              name={'search'}
              size={18}
              color={'#585858'}
              style={{marginRight: 20}}
            />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons
              name={'menu'}
              size={18}
              color={'#585858'}
              style={{marginLeft: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ургийн мод"
        component={Tree}
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
          tabBarIcon: ({color, size}) => (
            <FontIsto name={'sourcetree'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Хувийн мэдээлэл"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name={'user-circle-o'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Хүн нэмэх"
        component={AddPeople}
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
        }}
      />
    </Tab.Navigator>
  );
}

export default Bottomtabs;
