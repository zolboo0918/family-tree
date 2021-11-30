import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';
import Icon from 'react-native-vector-icons/Fontisto';

const SmallCircleItem = props => {
  return (
    <TouchableOpacity style={styles.listItem2}>
      <View style={styles.listImage2}>
        <Image
          resizeMode="cover"
          style={styles.listImage2}
          source={{uri: props.item.img}}
        />
        {props.user && (
          <View style={styles.iconContainer}>
            <Icon name="plus-a" style={styles.icon} />
          </View>
        )}
      </View>
      <Text style={styles.listText2}>{props.item.title}</Text>
    </TouchableOpacity>
  );
};

export default SmallCircleItem;

const styles = StyleSheet.create({
  listItem2: {
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -5,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#B2E392',
    borderWidth: 1,
    borderColor: '#fff',
  },
  icon: {
    color: '#fff',
    fontSize: 10,
  },
  listImage2: {
    height: '80%',
    width: '80%',
    borderRadius: 50,
  },

  listText2: {
    color: COLORS.TEXT_COLOR,
    fontSize: 10,
    marginRight: 10,
    marginTop: -5,
  },
});
