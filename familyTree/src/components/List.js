import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants';

const List = props => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        horizontal
        data={props.data}
        renderItem={({item, index}) => props.renderItem(item)}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {},
  image: {
    // height: '100%',
    // width: '100%',
    // borderRadius: 10,
  },
  title: {
    marginBottom: 10,
    color: COLORS.TEXT_COLOR,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
