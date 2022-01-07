import {DrawerItem} from '@react-navigation/drawer';
import {isEmpty} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const DrawerItemC = props => {
  const {
    labelStyle,
    label,
    icon,
    iconStyle,
    iconSize,
    style,
    pressColor,
    focused,
    onPress,
    to,
    iconType,
    item,
    index,
    position,
  } = props;
  const iconName = !isEmpty(icon)
    ? icon.includes('fa-')
      ? icon.split('fa-')[1]
      : icon
    : '';
  return (
    <DrawerItem
      to={to && to}
      labelStyle={labelStyle && labelStyle}
      label={label}
      icon={() =>
        iconType == 'MaterialCommunityIcons' ? (
          <MaterialCommunityIcons
            name={iconName}
            style={iconStyle && iconStyle}
            size={iconSize ? iconSize : 16}
          />
        ) : (
          <Icon
            name={iconName}
            style={iconStyle && iconStyle}
            size={iconSize ? iconSize : 16}
          />
        )
      }
      onPress={onPress}
      style={style && style}
      pressColor={pressColor && pressColor}
      focused={focused && focused}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#fff',
    marginLeft: -5,
    fontSize: 20,
  },
  label: {
    color: '#fff',
    marginVertical: -5,
    fontSize: 20,
  },
  container: {
    marginLeft: 10,
    height: 50,
    justifyContent: 'center',
  },
});
