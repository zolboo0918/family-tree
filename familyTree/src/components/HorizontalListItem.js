import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../constants';

const HorizontalListItem = props => {
  return (
    <View style={styles.container}>
      {props.item.color ? (
        <View
          style={[styles.leftContainer, {backgroundColor: props.item.color}]}>
          <Text style={styles.leftText}>{props.item.name.charAt(0)}</Text>
        </View>
      ) : (
        <View style={[styles.leftContainer, {backgroundColor: '#B2E392'}]}>
          <Icon name="user-o" style={styles.leftText} />
        </View>
      )}
      <View style={styles.right}>
        <View>
          <Text style={styles.name}>{props.item.name}</Text>
          {props.item.description && (
            <Text style={styles.description}>{props.item.description}</Text>
          )}
        </View>
        {props.item.count && (
          <Text style={styles.count}>{props.item.count}</Text>
        )}
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
  description: {
    fontSize: 14,
    color: '#a0a0a0',
  },
});
