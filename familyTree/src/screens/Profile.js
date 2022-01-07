import axios from 'axios';
import {Button, Select} from 'native-base';
import React, {Children, useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  COLORS,
  getHeight,
  getWidth,
  setHeight,
  setWidth,
  URL,
} from '../constants';
import {ProfileContext} from '../context/ProfileContext';
import TabViewExample from '../navigation/TabNavigator';
import {loginUserInfo} from './Login';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {getBasePerson} from '../service/common';
import Header from '../components/Header';
import {DrawerActions, useNavigation} from '@react-navigation/native';

// import MyTabs from '../navigation/TabNavigator';

const Profile = () => {
  const [father, setFather] = useState();
  const [Mother, setMother] = useState();
  // const [child, setChild] = useState();
  const [family, setFamily] = useState();
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [urag, setUrag] = useState([]);
  const [selectedUrag, setSelectedUrag] = useState('');
  const [uragFamily, setUragFamily] = useState([]);

  const [userInfo, setUserInfo] = useState(loginUserInfo[0]);

  const navigation = useNavigation();

  useEffect(() => {
    getUrag();
    axios
      .get(`${URL}/SearchFamily/4}`)
      .then(res => {
        setFather(res.data.response.father);
        setMother(res.data.response.Mother);
        // setChildren(res.data.response.children);
        setFamily(res.data.response.family);
      })
      .catch(err => console.log('aaaaaa', JSON.stringify(err)));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${URL}/`)
  //     .then(res => {
  //       setUragFamily(res.data);
  //     })
  //     .catch(err => Alert.alert('Алдаа', JSON.stringify(err)));
  // }, [selectedUrag]);

  const getUrag = () => {
    axios.get(`${URL}/UragOvog`).then(res => {
      setUrag(res.data.response);
    });
  };

  const updateProfile = () => {};

  return (
    <View>
      <Header
        leftIcon={'menu'}
        title={'Хувийн мэдээлэл'}
        onLeftPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image
            source={{
              uri: 'https://static01.nyt.com/images/2019/11/17/books/review/17Salam/Salam1-superJumbo.jpg',
            }}
            style={styles.profileImage}
          />
          <View style={{marginLeft: 20, justifyContent: 'center'}}>
            <Text style={styles.userName}>{loginUserInfo[0].fName}</Text>
            <Text style={styles.email}>{loginUserInfo[0].eMail}</Text>
            <Text style={styles.phone}>{loginUserInfo[0].lName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalShow(true)}
            style={styles.removeBtn}>
            <Text style={styles.removeBtnText}>Засах</Text>
          </TouchableOpacity>
          <Modal
            transparent
            visible={modalShow}
            animationType="fade"
            style={{}}>
            <ScrollView style={styles.modalContainer}>
              <Button
                style={styles.close}
                onPress={() => {
                  setModalShow(false);
                  setLoading(false);
                }}>
                <EvilIcon name="chevron-left" style={styles.closeIcon} />
              </Button>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {/* <Text
                style={{
                  fontSize: 20,
                  marginBottom: 20,
                  color: '#70A44E',
                  fontFamily: 'roboto',
                }}>
                МИНИЙ МЭДЭЭЛЭЛ
              </Text> */}
                <Image
                  source={{
                    uri: userInfo.Profile_Picture
                      ? userInfo.Profile_Picture
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY-vJ07Repan238qwOLHGf1vsdK5Mjr-IyBA&usqp=CAU',
                  }}
                  style={{height: 60, width: 60, borderRadius: 50}}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Регистрийн дугаар:</Text>
                  <TextInput
                    value={userInfo.RegNumber}
                    style={styles.input}
                    editable={false}
                  />
                  <Text style={styles.label}>Овог: </Text>
                  <TextInput
                    value={userInfo.lName}
                    style={styles.input}
                    onChange={val => setUserInfo({...userInfo, lName: val})}
                  />
                  <Text style={styles.label}>Нэр: </Text>
                  <TextInput
                    value={userInfo.fName}
                    style={styles.input}
                    onChange={val => setUserInfo({...userInfo, fName: val})}
                  />
                  <Text style={styles.label}>И-Мэйл: </Text>
                  <TextInput
                    value={userInfo.eMail}
                    style={styles.input}
                    onChange={val => setUserInfo({...userInfo, eMail: val})}
                  />
                  <Text style={styles.label}>Гэрлэсэн эсэх: </Text>
                  <TextInput
                    value={userInfo.Marriage_Status}
                    style={styles.input}
                    onChange={val =>
                      setUserInfo({...userInfo, Marriage_Status: val})
                    }
                  />
                  <Text style={styles.label}>Төрсөн өдөр: </Text>
                  <TextInput
                    value={userInfo.date_of_birth}
                    style={styles.input}
                  />
                  <Text style={styles.label}>Миний тухай: </Text>
                  <TextInput
                    value={userInfo.Person_Intro}
                    style={styles.input}
                  />
                </View>
                <Text style={styles.label2}>Ургийн овог сонгох</Text>

                <Select
                  onValueChange={val => setSelectedUrag(val)}
                  width={'80%'}
                  style={{height: 35}}
                  borderRadius={20}
                  placeholder="Сонгох">
                  {urag?.map(el => (
                    <Select.Item label={el.Name} value={el.ID} />
                  ))}
                </Select>
                <Text style={styles.label2}>Гэр бүл сонгох</Text>
                <Select
                  onValueChange={val => {}}
                  width={'80%'}
                  style={{height: 35}}
                  borderRadius={20}
                  placeholder="Сонгох">
                  {uragFamily?.map(el => (
                    <Select.Item label={el.Name} value={el.ID} />
                  ))}
                </Select>
                {loading ? (
                  <ActivityIndicator
                    color={'#70A44E'}
                    style={{marginTop: 30}}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={updateProfile}>
                    <Text style={{height: 30, color: '#fff', marginTop: 7}}>
                      Хадгалах
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </Modal>
        </View>
        <View style={{height: '100%', width: '100%'}}>
          <TabViewExample />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  topSection: {
    flexDirection: 'row',
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#1D2E42',
  },
  phone: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  email: {
    width: 180,
    fontSize: 14,
    color: '#a0a0a0',
  },
  removeBtn: {
    borderRadius: 30,
    width: 75,
    height: 25,
    backgroundColor: '#FB6E50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 25,
  },
  removeBtnText: {
    fontSize: 14,
    color: '#fff',
  },
  modalContainer: {
    height: getHeight(),
    width: getWidth(),
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
  close: {
    width: 30,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  closeIcon: {
    height: 40,
    width: 40,
    fontSize: 40,
    marginLeft: 10,
    marginTop: 10,
    color: '#585858',
    alignSelf: 'center',
  },
  input1: {
    fontSize: 13,
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    borderColor: '#e1e1e1',
    width: '90%',
    height: 40,
    marginTop: 20,
    color: '#585858',
  },
  addBtn: {
    height: 40,
    width: 120,
    marginVertical: 20,
    backgroundColor: '#70A44E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  insertPhoto: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: '#70A44E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  postImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  postIcon: {
    height: 15,
    width: 15,
    fontSize: 15,
    color: '#fff',
    alignSelf: 'center',
  },
  textItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 35,
    borderRadius: 20,
    borderColor: '#e1e1e1',
    color: '#585858',
    borderWidth: 1,
  },
  label: {
    color: '#585858',
    marginVertical: 5,
  },
  label2: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginTop: 5,
  },
  infoContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    paddingHorizontal: '10%',
  },
});
