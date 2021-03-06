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
import {BottomFabBar} from 'rn-wave-bottom-bar';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import SelectParent from '../screens/SelectParent';
import insertParent from '../screens/AddPeople';

const Tab = createBottomTabNavigator();
const options = {headerShown: false};

function Bottomtabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#5F0B65',
        tabBarActiveBackgroundColor: '#FFF',
        tabBarInactiveBackgroundColor: 'red',
      }}
      tabBar={props => (
        <BottomFabBar
          focusedButtonStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            elevation: 14,
            backgroundColor: '#fff',
          }}
          bottomBarContainerStyle={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          {...props}
        />
      )}>
      <Tab.Screen
        name="Нүүр"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          // headerTitle: 'Нүүр',
          // headerTitleAlign: 'center',
          // headerShadowVisible: false,
          // headerTitleStyle: {color: '#585858', fontSize: 18},
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
          tabBarIcon: ({color, size}) => (
            <Feather name={'home'} color={color} size={20} />
          ),
          // headerLeft: () => (
          //   <MaterialCommunityIcons
          //     onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          //     name={'menu'}
          //     size={18}
          //     color={'#585858'}
          //     style={{marginLeft: 20}}
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name="Хайлт"
        component={Search}
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
          tabBarIcon: ({color, size}) => (
            <FontIsto name={'search'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ургийн мод"
        component={Tree}
        options={{
          headerShown: false,
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
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name={'user-circle-o'} size={20} color={color} />
          ),
        }}
      />
      {/*<Tab.Screen
        name="Хүн нэмэх"
        component={AddPeople}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.TREE_COLOR,
          tabBarInactiveTintColor: '#585858',
        }}
      />*/}
    </Tab.Navigator>
  );
}

export default Bottomtabs;
