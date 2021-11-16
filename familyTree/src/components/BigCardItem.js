import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

const BigCardItem = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.listImage} source={{uri: props.item.img}} />
      <Text style={styles.listText}>{props.item.title}</Text>
    </View>
  );
};

export default BigCardItem;

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 100,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listImage: {
    height: '80%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listText: {
    alignSelf: 'flex-start',
    paddingLeft: 5,
    marginVertical: 5,
  },
});
