import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Button, Checkbox, Radio, Select} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, setHeight, setWidth, URL} from '../constants';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {loginUserInfo} from './Login';
import {isEmpty} from 'lodash';

import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Header from '../components/Header';
import {borderWidth} from 'styled-system';

const AddPeople = () => {
  const bpParams = {
    RegNumber: '',
    lName: '',
    fName: '',
    eMail: null,
    Person_Intro: '',
    Profile_Picture: '',
    Marriage_Status: null,
    Marriage_Date: {},
    isAlive: null,
    date_of_birth: new Date(),
    date_of_death: new Date(),
    urgiin_ovog_ID: '',
  };

  const famInf = {
    Name: '',
    Description: '',
    Created_Date: new Date(),
    urgiin_ovog_ID: '',
  };
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isAlive, setisAlive] = useState();
  const [gender, setGender] = useState();
  const [AllFamily, setAllFamily] = useState([]);
  const [state, setState] = useState(bpParams);
  const [familyName, setFamilyName] = useState('');
  const [selectedFamilyID, setSelectedFamilyID] = useState();
  const [state1, setState1] = useState(famInf);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UrgiinOvog, setUrgiinOvog] = useState([]);
  const Navigation = useNavigation();

  useEffect(() => {
    getAllFamily();
  }, []);

  useEffect(() => {
    if (modalShow) {
      selectUragO();
    }
  }, [modalShow]);

  const getAllFamily = () => {
    axios
      .get(`${URL}/SearchFamily`)
      .then(res => {
        if (res.data.status == 'success') {
          setAllFamily(res.data.response);
        }
      })
      .catch(err => {});
  };
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      console.log(image);
    });
  };
  const AddNewPerson = () => {
    axios
      .post(`${URL}/users`, {
        lName: state.lName,
        fName: state.fName,
        RegNumber: state.RegNumber,
        eMail: state.eMail,
        Profile_Picture: state.Profile_Picture,
        Gender_ID: gender,
        Person_Intro: state.Person_Intro,
        date_of_birth: `${date.getFullYear()}-${
          date.getMonth() - 1
        }-${date.getDate()}`,
        date_of_death: `${date.getFullYear()}-${
          date.getMonth() - 1
        }-${date.getDate()}`,
        urgiin_ovog_ID: state.urgiin_ovog_ID,
      })
      .then(res => {
        if (res.data.status == 'success') {
          axios
            .post(`${URL}/FamilyMember`, {
              familyId: selectedFamilyID,
              personId: res.data.response.insertId,
            })
            .then(resss => {
              if (resss.data.status == 'success') {
                Toast.show({title: 'Гэр бүл амжилттай нэмэгдлээ'});
              }
            })
            .catch(err => {});
          Navigation.navigate('Эцэг эх сонгох', {
            ID: selectedFamilyID,
            childPersonId: res.data.response.insertId,
          });
        }
      })
      .catch(err => {});
  };
  const openFamMod = () => {
    setModalShow(true);
  };
  const insertFamily = () => {
    setLoading(true);
    axios
      .post(`${URL}/SearchFamily`, {
        Name: state1.Name,
        Description: state1.Description,
        Created_Date: `${date.getFullYear()}-${
          date.getMonth() - 1
        }-${date.getDate()}`,
        urgiin_ovog_ID: state1.urgiin_ovog_ID,
      })
      .then(() => {
        setLoading(false);
        setModalShow(false);
        getAllFamily();
        Toast.show({title: 'Амжилттай нэмэгдлээ'});
      })
      .catch(err => {
        setLoading(false);
        setModalShow(false);
      });
  };
  const selectUragO = () => {
    axios
      .get(`${URL}/UragOvog`)
      .then(res => {
        setUrgiinOvog(res.data.response);
      })
      .catch(err => {
        console.log(`err****`, err);
      });
  };

  const addNewPerson = () => {
    props.navigation.navigate('TreeModel');
  };
  return (
    <>
      <Header
        leftIcon={'menu'}
        title={'Гишүүн нэмэх'}
        onLeftPress={() => Navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Зураг</Text>
        <View style={styles.profileImageContainer}>
          <Image
            style={{height: 80, width: 80}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            onChangeText={value => setState({...state, Profile_Picture: value})}
          />
          <TouchableOpacity onPress={uploadImage}>
            <Icon
              name="pluscircle"
              style={{
                position: 'absolute',
                color: COLORS.TREE_COLOR,
                bottom: 0,
                right: -6,
                fontSize: 22,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Үндсэн мэдээлэл</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setState({...state, lName: value})}
          placeholder="Овог"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          style={styles.input}
          onChangeText={value => setState({...state, fName: value})}
          placeholder="Нэр"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          style={styles.input}
          onChangeText={value => setState({...state, RegNumber: value})}
          placeholder="Регистрийн дугаар"
          placeholderTextColor={'#a0a0a0'}
        />
        <Text style={styles.title}>Төрсөн өдөр</Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 15,
          }}>
          <DatePicker
            modal
            open={open}
            style={{width: 260, height: 50, borderWidth: 1, borderRadius: 15}}
            date={state.date_of_birth}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setState({...state, date_of_birth: date});
            }}
            onCancel={() => {
              setOpen(false);
            }}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Сонгох"
            cancelBtnText="Болих"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                height: 60,
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              // this.setState({date: date});
              // setDate(date);
              setState({...state, date_of_birth: date});
            }}
          />
          <TextInput
            style={styles.input6}
            // editable={false}
            value={state.date_of_birth.toLocaleDateString()}
            placeholder="Select date"
            onPressIn={() => setOpen(true)}
          />
        </View>
        <Text style={styles.title}>Гэр бүл сонгох</Text>
        <View>
          <AddFamilyModal
            modalShow={modalShow}
            UrgiinOvog={UrgiinOvog}
            state1={state1}
            loading={loading}
            setState1={setState1}
            insertFamily={insertFamily}
            setModalShow={setModalShow}
          />
          <Select
            borderWidth={0}
            placeholder="Сонгох"
            fontSize={15}
            style={{
              borderWidth: 1,
              borderRadius: 15,
              backgroundColor: '#fff',
              height: 40,
            }}
            onValueChange={val => {
              const name = val.split('#')[0];
              const id = val.split('#')[1];
              setFamilyName(val);
              setSelectedFamilyID(id);
            }}>
            <Button onPress={openFamMod}> Гэр бүл нэмэх</Button>
            {AllFamily?.map(el => (
              <Select.Item label={el.Name} value={`${el.Name}#${el.ID}`} />
            ))}
          </Select>
        </View>
        <Text style={styles.title}>Одоогийн төлөв</Text>
        <Radio.Group
          name="isAliveGroup"
          style={{flexDirection: 'row'}}
          onChange={value => {
            setisAlive(value);
          }}>
          <Radio value="1" my={1} colorScheme={'green'}>
            <Text style={{fontSize: 14, marginLeft: 10, color: '#585858'}}>
              Амьд
            </Text>
          </Radio>
          <Radio
            value="0"
            my={1}
            style={{marginLeft: 20}}
            colorScheme={'green'}>
            <Text style={{fontSize: 14, marginLeft: 10, color: '#585858'}}>
              Нас барсан
            </Text>
          </Radio>
        </Radio.Group>

        {isAlive == '0' && (
          <>
            <Text style={styles.title}>Нас барсан өдөр</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                editable={isAlive == '0'}
                style={[
                  styles.inputDate,
                  {
                    borderBottomColor:
                      isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0',
                  },
                ]}
                keyboardType="number-pad"
                placeholder="Өдөр"
                placeholderTextColor={'#a0a0a0'}
              />
              <TextInput
                editable={isAlive == '0'}
                keyboardType="number-pad"
                style={[
                  styles.inputDate,
                  {
                    borderBottomColor:
                      isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0',
                  },
                ]}
                placeholder="Сар"
                placeholderTextColor={'#a0a0a0'}
              />
              <TextInput
                keyboardType="number-pad"
                editable={isAlive == '0'}
                style={[
                  styles.inputDate,
                  {
                    borderBottomColor:
                      isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0',
                  },
                ]}
                placeholder="Жил"
                placeholderTextColor={'#a0a0a0'}
              />
            </View>
          </>
        )}
        <Text style={styles.title}>Хүйс</Text>
        <Radio.Group
          name="isAliveGroup"
          style={{flexDirection: 'row'}}
          onChange={value => {
            setGender(value);
          }}>
          <Radio value="1" my={1} colorScheme={'green'}>
            <Text style={{fontSize: 14, marginLeft: 10, color: '#585858'}}>
              Эр
            </Text>
          </Radio>
          <Radio
            value="2"
            my={1}
            style={{marginLeft: 20}}
            colorScheme={'green'}>
            <Text style={{fontSize: 14, marginLeft: 10, color: '#585858'}}>
              Эм
            </Text>
          </Radio>
        </Radio.Group>
        <Text style={styles.title}>Тэмдэглэл</Text>
        <TextInput
          placeholder="Өөрийн тухай товч"
          style={styles.note}
          onChangeText={value => setState({...state, Person_Intro: value})}
        />
        <TouchableOpacity style={styles.Addbutton} onPress={openFamMod}>
          <Text style={styles.ButtonTitle}>Гишүүн нэмэх</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default AddPeople;

const AddFamilyModal = props => {
  const {
    modalShow,
    UrgiinOvog,
    state1,
    setState1,
    loading,
    insertFamily,
    setModalShow,
  } = props;
  return (
    <Modal visible={modalShow} transparent>
      <View style={styles.modalContainer}>
        <Button style={styles.modalClose} onPress={() => setModalShow(false)}>
          <EvilIcon name="close-o" style={styles.modalCloseIcon} />
        </Button>
        <Text style={styles.familyName}>Гэр Бүлийн нэр</Text>
        <TextInput
          style={styles.familyInput}
          value={state1.Name}
          onChangeText={value => setState1({...state1, Name: value})}
          placeholder="Хэний гэр бүл вэ?"
          placeholderTextColor={'#a0a0a0'}
        />
        <Text style={styles.text1}>Нэмэлт мэдээлэл</Text>
        <TextInput
          style={styles.input2}
          value={state1.Description}
          onChangeText={value => setState1({...state1, Description: value})}
          placeholder="Нэмэлт мэдээлэл"
          placeholderTextColor={'#a0a0a0'}
        />
        <Text style={styles.text2}>Хэзээ Үүссэн?</Text>
        <TextInput
          style={styles.input3}
          value={state1.Created_Date}
          onChangeText={value => setState1({...state1, Created_Date: value})}
          placeholder="Хэзээ үүссэн бэ?"
          placeholderTextColor={'#a0a0a0'}
        />
        <Text style={styles.text4}>Овгийн нэр</Text>
        <Select
          placeholder="Ургийн овог сонгох"
          onValueChange={val => {
            setState1({...state1, urgiin_ovog_ID: val});
          }}>
          {UrgiinOvog?.map(el => {
            return <Select.Item label={el.Name} value={el.ID} />;
          })}
        </Select>
        <Button
          height={10}
          width={100}
          marginTop={30}
          bgColor={'#70A44E'}
          justifyContent={'center'}
          alignSelf={'center'}
          borderRadius={20}
          onPress={insertFamily}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.text5}>Нэмэх</Text>
          )}
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    backgroundColor: '#fff',
    position: 'relative',
    width: 100,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 10,
  },
  Addbutton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderColor: 'black',
    backgroundColor: COLORS.TREE_COLOR,
    color: 'black',
    borderRadius: 35,
    width: setWidth(40),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: setHeight(5),
    paddingVertical: 10,
  },
  ButtonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  title: {
    color: '#585858',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 15,
    height: 40,
    backgroundColor: '#fff',
    color: '#fff',
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  inputDate: {
    borderBottomWidth: 1,
    borderColor: COLORS.TREE_COLOR,
    height: 40,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#585858',
    margin: 5,
  },
  note: {
    height: 70,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#e1e1e1',
    marginTop: 10,
    marginBottom: 50,
  },
  Button: {
    height: 40,
    width: 150,
    borderWidth: 0.1,
    alignItems: 'center',
    alignContent: 'space-around',
  },
  modalContainer: {
    height: setHeight(70),
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
  modalCloseIcon: {
    height: 15,
    width: 20,
    fontSize: 20,
    color: '#585858',
    alignSelf: 'center',
  },
  familyName: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#000',
    fontSize: 14,
  },
  familyInput: {
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#e1e1e1',
    width: '90%',
    height: 50,
    marginTop: 10,
    color: '#000',
  },
  input2: {
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#e1e1e1',
    width: '90%',
    height: 50,
    color: '#000',
    marginTop: 10,
  },
  text1: {
    marginLeft: 25,
    marginTop: 10,
    color: '#000',
  },
  text2: {
    marginLeft: 30,
    color: '#000',
  },
  input3: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#e1e1e1',
    width: '90%',
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    color: '#000',
  },
  text4: {
    marginLeft: 30,
    color: '#000',
  },
  text5: {
    height: 30,
    color: '#fff',
    marginTop: 7,
  },
  input6: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 15,
    height: 40,
    paddingHorizontal: 10,
    color: '#585858',
  },
});
