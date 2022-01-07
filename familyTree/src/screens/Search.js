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
  useRoute,
} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {COLORS, getWidth, setHeight, setWidth, URL} from '../constants';
import {Button, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {loginUserInfo} from './Login';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const Search = () => {
  const [urag, setUrag] = useState();
  const [filteredValue, setFilteredValue] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [Name, setName] = useState();
  const [Description, setDescription] = useState();
  const [Created_Date, setCreated_Date] = useState();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    getUrag();
  }, []);

  const getUrag = () => {
    axios.get(`${URL}/UragOvog`).then(res => {
      setUrag(res.data.response);
      setFilteredValue(res.data.response);
    });
  };

  const search = val => {
    setInputValue(val);
    if (inputValue == '') {
      setFilteredValue(urag);
    } else {
      setFilteredValue(
        urag.filter(el => el.Name?.toLowerCase().includes(val.toLowerCase())),
      );
    }
  };

  const Insert = () => {
    axios
      .post(`${URL}/UragOvog`, {
        Name,
        Description,
        Created_Date,
      })
      .then(res => {
        Toast.show({title: 'Амжилттай'});
        setModalShow(false);
        getUrag();
      })
      .catch(err => console.log(err));
  };
  return (
    <View>
      <View style={[{flex: 1}]}>
        <View style={{width: '100%'}}>
          {showSearchInput ? (
            <View
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                width: getWidth(),
                height: 50,
                justifyContent: 'space-between',
              }}>
              <TextInput
                autoFocus
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
              <TouchableOpacity style={[styles.contentRight]} onPress={search}>
                <AntDesign
                  onPress={() => setShowSearchInput(false)}
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
                      alignSelf: 'flex-end',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.contentCenter]}>
                <Text
                  style={{fontSize: 18, color: '#585858', fontWeight: 'bold'}}
                  numberOfLines={1}>
                  Хайх
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
      <View style={styles.container}>
        <List
          data={filteredValue}
          style={{marginTop: 30, marginBottom: 160}}
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
          marginBottom={140}
          justifyContent={'center'}
          alignItems={'center'}
          bgColor={'#FFAB2E'}
          renderInPortal={false}
          onPress={() => setModalShow(true)}
          icon={<Icon name="plus" size={20} color={'#fff'} />}
        />
        <Modal transparent visible={modalShow}>
          <View style={styles.modalContainer}>
            <Button
              style={styles.modalClose}
              onPress={() => setModalShow(false)}>
              <EvilIcon name="close-o" style={styles.closeIcon} />
            </Button>
            <View style={styles.top}>
              <Text>Овгийн Нэр</Text>
              <TextInput
                style={styles.input}
                value={Name}
                onChangeText={setName}
              />
              <Text>Нэмэлт мэдээлэл</Text>
              <TextInput
                style={styles.input}
                value={Description}
                onChangeText={setDescription}
              />
              <Text>Хэзээ Үүссэн?</Text>
              <TextInput
                style={styles.input}
                value={Created_Date}
                onChangeText={setCreated_Date}
              />
              <Button
                style={{height: 40}}
                width={120}
                marginTop={30}
                alignSelf={'center'}
                bgColor={'#70A44E'}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={20}
                onPress={Insert}>
                <Text style={{color: '#fff', fontSize: 17}}>Нэмэх</Text>
              </Button>
            </View>
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
    backgroundColor: '#fff',
    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
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
    width: setWidth(67),
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
  right: {},
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    fontSize: 20,
    color: 'white',
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
    fontWeight: 'bold',
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
  modalContainer: {
    borderRadius: 10,
    height: setHeight(55),
    width: setWidth(80),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
  },
  modalClose: {
    width: 30,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
  },
  closeIcon: {
    height: 15,
    width: 20,
    fontSize: 20,
    color: '#585858',
    alignSelf: 'center',
  },
  top: {
    height: 350,
    width: '100%',
    flexDirection: 'column',
    marginLeft: 10,
  },
  input: {
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#e1e1e1',
    width: '94%',
    height: 40,
    marginTop: 5,
    marginBottom: 20,
  },
});
