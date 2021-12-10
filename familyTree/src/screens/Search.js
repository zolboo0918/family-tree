import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HorizontalListItem from '../components/HorizontalListItem';
import List from '../components/List';
import {dataFamily} from '../testData';

const Search = () => {
  const [urag, setUrag] = useState();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const search = () => {};
  useEffect(() => {
    axios
      .get('http://192.168.193.130:3001/UragOvog')
      .then(res => {
        console.log('success', res);
        setUrag(res.data.response);
      })
      .catch(err => console.log('err :>> ', err));
  }, []);
  return (
    <View>
      <View>
        <View style={[{flex: 1}]}>
          <View style={[styles.contain]}>
            <TouchableOpacity style={[styles.contentLeft]} onPress={() => {}}>
              <Feather
                name="menu"
                style={{
                  color: '#585858',
                  fontSize: 28,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.contentCenter]}>
            <Text style={{}} numberOfLines={1}>
              aslkdf
            </Text>
          </View>
          <View style={[styles.right]}>
            <TouchableOpacity style={[styles.contentRight]} onPress={search}>
              <Feather
                name="search"
                style={{
                  color: '#585858',
                  fontSize: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <List
          data={urag}
          style={{marginTop: -10}}
          renderItem={function (item) {
            return <HorizontalListItem item={item} />;
          }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F5F6',
    marginHorizontal: 20,
  },
  contain: {
    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 60,
  },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
