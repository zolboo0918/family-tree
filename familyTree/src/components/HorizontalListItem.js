import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants';

const HorizontalListItem = props => {
  return (
    <View style={styles.container}>
      <View style={[styles.leftContainer, {backgroundColor: props.item.color}]}>
        <Text style={styles.leftText}>{props.item.name.charAt(0)}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.name}>{props.item.name}</Text>
        <Text style={styles.count}>{props.item.count}</Text>
      </View>
    </View>
  );
};

export default HorizontalListItem;

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
  },
  leftContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    fontSize: 20,
    color: '#fff',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginLeft: 20,
  },
  name: {
    fontSize: 16,
    color: '#585858',
  },
  count: {
    fontSize: 16,
    color: COLORS.TREE_COLOR,
  },
});
