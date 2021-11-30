import React from 'react';
import {StyleSheet, View} from 'react-native';
import HorizontalListItem from '../components/HorizontalListItem';
import List from '../components/List';
import {dataFamily} from '../testData';

const Search = () => {
  return (
    <View style={styles.container}>
      <List
        data={dataFamily}
        style={{marginTop: -10}}
        renderItem={function (item) {
          return <HorizontalListItem item={item} />;
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F5F6',
    marginHorizontal: 20,
  },
});
