import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {COLORS} from '../constants';

const SmallCircleItem = props => {
  return (
    <View style={styles.listItem2}>
      <Image
        resizeMode="cover"
        style={styles.listImage2}
        source={{uri: props.item.img}}
      />
      <Text style={styles.listText2}>{props.item.title}</Text>
    </View>
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
  },

  listImage2: {
    height: '80%',
    width: '80%',
    borderRadius: 50,
  },

  listText2: {
    color: COLORS.TEXT_COLOR,
    fontSize: 10,
  },
});
