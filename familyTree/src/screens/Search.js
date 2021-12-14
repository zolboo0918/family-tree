import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HorizontalListItem from '../components/HorizontalListItem';
import List from '../components/List';
import {dataFamily} from '../testData';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {getWidth, setWidth} from '../constants';

const Search = () => {
  const [urag, setUrag] = useState();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  let result;
  useEffect(() => {
    axios
      .get('http://192.168.193.99:3001/UragOvog')
      .then(res => {
        console.log('success', res);
        setUrag(res.data.response);
        result = res.data.response;
      })
      .catch(err => console.log('err :>> ', err));
  }, []);

  const search = val => {
    setInputValue(val);
    if (inputValue == '') {
      setUrag(result);
    } else {
      setUrag(urag.filter(el => el.Name.includes(val)));
    }
  };

  return (
    <View>
      <View>
        <View style={[{flex: 1}]}>
          <View>
            {showSearchInput ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: getWidth(),
                  height: 50,
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  value={inputValue}
                  onChangeText={search}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e1e1e1',
                    height: 50,
                    width: setWidth(90),
                  }}
                />
                <TouchableOpacity
                  style={[styles.contentRight]}
                  onPress={search}>
                  <AntDesign
                    name="close"
                    style={{
                      color: '#585858',
                      fontSize: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.contain]}>
                <View>
                  <TouchableOpacity
                    style={[styles.contentLeft]}
                    onPress={() => {
                      navigation.dispatch(DrawerActions.toggleDrawer());
                    }}>
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
                    haih
                  </Text>
                </View>
                <View style={[styles.right]}>
                  <TouchableOpacity
                    style={[styles.contentRight]}
                    onPress={() => setShowSearchInput(!showSearchInput)}>
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
            )}
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <List
          data={urag}
          style={{marginTop: 30}}
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
    // backgroundColor: '#F3F5F6',
    marginHorizontal: 20,
  },
  contain: {
    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
    height: 50,
    justifyContent: 'space-between',
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
    alignSelf: 'center',
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
