import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';

const ListItem = props => {
  return (
    <TouchableOpacity style={styles.listItem2}>
      <View style={styles.row}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.text}>{props.item.date}</Text>
      </View>
      <Text style={styles.text}>{props.item.event}</Text>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItem2: {
    height: 80,
    marginVertical: 5,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    width: '70%',
    color: COLORS.TEXT_COLOR,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  title: {
    width: '80%',
    color: COLORS.TEXT_COLOR,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
});
