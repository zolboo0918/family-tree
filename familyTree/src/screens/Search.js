import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
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
import {COLORS, getWidth, setWidth} from '../constants';
import {Button, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {loginUserInfo} from './Login';

const Search = () => {
  const [urag, setUrag] = useState();
  const [filteredValue, setFilteredValue] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const [modalShow, setModalShow] = useState(false);

  const [Name, setName] = useState();
  const [Description, setDescription] = useState();
  const [Created_Date, setCreated_Date] = useState();
  const [base_person_ID, setbase_person_ID] = useState();

  useEffect(() => {
    axios.get('http://192.168.193.125:3001/UragOvog').then(res => {
      setUrag(res.data.response);
      setFilteredValue(res.data.response);
    });
  }, []);

  const search = val => {
    setInputValue(val);
    if (inputValue == '') {
      setFilteredValue(urag);
    } else {
      setFilteredValue(urag.filter(el => el.Name.toLowerCase().includes(val)));
    }
  };

  const Insert = () => {
    axios
      .post('http://192.168.193.125:3001/UragOvog', {
        Name,
        Description,
        Created_Date,
        base_person_ID: loginUserInfo[0].ID,
      })
      .then(res => {
        Alert.alert('Boltsnshuu kk');
      });
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
          data={filteredValue}
          style={{marginTop: 30}}
          renderItem={function (item) {
            return (
              <View style={styles.containerList}>
                {item.color ? (
                  <View
                    style={[
                      styles.leftContainer,
                      {backgroundColor: item.color},
                    ]}>
                    <Text style={styles.leftText}>{item.name.charAt(0)}</Text>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.leftContainer,
                      {backgroundColor: '#B2E392'},
                    ]}>
                    <Icon name="user-o" style={styles.leftText} />
                  </View>
                )}
                <View style={styles.right}>
                  <View>
                    <Text style={styles.name}>{item.Name}</Text>
                    {item.description && (
                      <Text style={styles.description}>{item.description}</Text>
                    )}
                  </View>
                  {item.count && <Text style={styles.count}>{item.count}</Text>}
                </View>
              </View>
            );
          }}
        />
        <Fab
          height={50}
          width={50}
          marginBottom={70}
          justifyContent={'center'}
          alignItems={'center'}
          bgColor={'#585858'}
          onPress={() => setModalShow(true)}
          icon={<Icon name="plus" size={20} color={'#fff'} />}
        />
        <Modal visible={modalShow}>
          <Button onPress={() => setModalShow(false)} />
          <View
            style={{
              height: 100,
              width: '90%',
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text>Овгийн Нэр</Text>
            <TextInput
              style={{
                width: '90%',
                height: 50,
                backgroundColor: 'green',
                marginTop: 600,
              }}
              value={Name}
              onChangeText={setName}
            />
            <Text>Нэмэлт мэдээлэл</Text>
            <TextInput
              style={{width: '90%', height: 50, backgroundColor: 'green'}}
              value={Description}
              onChangeText={setDescription}
            />
            <Text>Хэзээ Үүссэн?</Text>
            <TextInput
              style={{width: '90%', height: 50, backgroundColor: 'green'}}
              value={Created_Date}
              onChangeText={setCreated_Date}
            />

            <Button height={30} width={100} onPress={Insert} />
          </View>
        </Modal>
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
  containerList: {
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
