import {CommonActions} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {BackHandler, View, ScrollView} from 'react-native';
import {DrawerItemC} from './DrawerItem';
import SideMenuHeader from './SideMenuHeader';
import {useNavigation} from '@react-navigation/native';

function SideMenu(props) {
  const [position, setPosition] = useState(0);
  const navigation = useNavigation();

  const onMenuPress = (item, index) => {
    props.navigation.closeDrawer();
    if (position == index) {
      return;
    } else {
      item = {...item, beforePath: 'menu'};
      setPosition(index);
    }
  };

  return (
    <View style={{}}>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}>
        <SideMenuHeader />
        <View style={{}}>
          <DrawerItemC
            label="Нүүр"
            labelStyle={{}}
            icon="home"
            iconStyle={{color: '#282828', width: 25}}
            style={{}}
            onPress={() => navigation.navigate('Home')}
            iconSize={22}
            pressColor={'green'}
            index={98}
            position={position}
          />
          <DrawerItemC
            label="Гэр бүлд гишүүн нэмэх"
            labelStyle={{}}
            icon="home"
            iconStyle={{color: '#282828', width: 25}}
            style={{}}
            onPress={() => navigation.navigate('AddPeople')}
            iconSize={22}
            pressColor={'green'}
            index={98}
            position={position}
          />
          {/* <DrawerItemC
            label="Грүп"
            labelStyle={{}}
            icon="users"
            iconStyle={{color: '#282828', width: 25}}
            style={{}}
            iconSize={22}
            pressColor={'green'}
            index={98}
            position={position}
          />
          <DrawerItemC
            label="Чат"
            labelStyle={{}}
            icon="chat"
            iconType="MaterialCommunityIcons"
            iconStyle={{color: '#282828', width: 25}}
            style={{}}
            iconSize={22}
            pressColor={'green'}
            index={100}
            position={position}
          />
          <DrawerItemC
            label="Гишүүн хайх"
            labelStyle={{}}
            icon="account-search"
            iconType="MaterialCommunityIcons"
            iconStyle={{color: '#282828', width: 25}}
            style={{}}
            iconSize={22}
            pressColor={'green'}
            index={98}
            position={position}
          /> */}
        </View>

        <DrawerItemC
          label="Гарах"
          labelStyle={{}}
          icon="sign-out-alt"
          iconStyle={{color: '#282828', width: 25}}
          style={{}}
          iconSize={22}
          pressColor={'green'}
          index={100}
          position={position}
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </View>
  );
}
export default SideMenu;

import {Platform, StyleSheet} from 'react-native';
import {getHeight, setHeight, setWidth} from '../constants';
export const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    minHeight: getHeight(),
    // paddingBottom: 50,
  },
  menuItem: {
    height: 50,
    borderWidth: 1,
    borderColor: 'green',
  },
  drawerItem: {
    marginHorizontal: 15,
    borderRadius: 30,
    height: setHeight(5),
    justifyContent: 'center',
  },
  drawerItemLabel: {
    height: Platform.OS == 'android' ? setHeight(3) : undefined,
    textAlignVertical: 'center',
    color: '#282828',
    fontWeight: '700',
    fontSize: setHeight(1.85),
    marginLeft: -setWidth(3.5),
  },
  drawerItemIcon: {
    color: '#282828',
    marginLeft: setWidth(2),
    width: setWidth(5),
    fontSize: setHeight(2.2),
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  drawerFooter: {
    marginRight: 15,
    marginLeft: 25,
    borderRadius: 30,
    height: setHeight(6),
    justifyContent: 'center',
    minWidth: 150,
  },
  drawerFooterLabel: {
    // textAlignVertical: "center",
    // color: "#282828",
    // alignItems: "flex-start",
    // fontFamily: Fonts.robotoMedium,
    // fontSize: setHeight(1.7),

    height: Platform.OS == 'android' ? setHeight(3) : undefined,
    textAlignVertical: 'center',
    color: '#282828',
    fontWeight: '700',
    fontSize: setHeight(1.85),
    marginLeft: -setWidth(5.5),
  },
  itemSection: {
    marginTop: setHeight(2.5),
  },
});
