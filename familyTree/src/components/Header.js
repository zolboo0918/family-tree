import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {getWidth, setWidth} from '../constants';

const Header = props => {
  const {leftIcon, rightIcon, title, onLeftPress, onRightPress} = props;
  return (
    <View style={[styles.contain]}>
      {leftIcon && (
        <TouchableOpacity style={[styles.contentLeft]} onPress={onLeftPress}>
          <Feather
            name={leftIcon}
            style={{
              color: '#585858',
              fontSize: 28,
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
      )}
      <View style={[styles.contentCenter]}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {rightIcon && (
        <TouchableOpacity style={[styles.contentRight]} onPress={onRightPress}>
          <Feather
            name={rightIcon}
            style={{
              color: '#585858',
              fontSize: 20,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  contain: {
    backgroundColor: '#fff',
    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
    height: 50,
    flexDirection: 'row',
    width: '100%',
  },
  contentLeft: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 60,
  },
  contentCenter: {
    justifyContent: 'center',
    width: setWidth(60),
    alignItems: 'center',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    height: '100%',
    width: 60,
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
    width: 60,
  },
  title: {
    fontSize: 18,
    color: '#585858',
    fontWeight: 'bold',
  },
});
