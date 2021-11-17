import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';

const BigCardItem = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.listImage}
        source={{uri: props.item.img}}
      />
      <Text style={styles.listText}>{props.item.title}</Text>
    </TouchableOpacity>
  );
};

export default BigCardItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    height: 90,
    width: 90,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listImage: {
    height: '80%',
    width: '100%',
    padding: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listText: {
    alignSelf: 'flex-start',
    fontSize: 12,
    paddingLeft: 5,
    paddingBottom: 5,
    marginVertical: 5,
  },
});
