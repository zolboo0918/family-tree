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
import {COLORS, setHeight, setWidth} from '../constants';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {loginUserInfo} from './Login';
import {isEmpty} from 'lodash';

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
  const [dDate, setdDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isAlive, setisAlive] = useState();
  const [gender, setGender] = useState();
  const [familyId, setFamilyId] = useState();
  const [AllFamily, setAllFamily] = useState([]);
  const [state, setState] = useState(bpParams);
  const [familyName, setFamilyName] = useState('');
  const [selectedFamilyID, setSelectedFamilyID] = useState();
  const [addedPersonId, setAddedPersonId] = useState();
  const [Name, setName] = useState();
  const [Description, setDescription] = useState();
  const [Created_Date, setCreated_Date] = useState();
  const [urgiin_ovog_ID, setUrgiin_ovog_ID] = useState();
  const [state1, setState1] = useState(famInf);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const Navigation = useNavigation();
  useEffect(() => {
    getAllFamily();
  }, []);
  const getAllFamily = () => {
    axios
      .get('http://192.168.193.116:3001/SearchFamily')
      .then(res => {
        console.log(`res.data`, res.data);
        if (res.data.status == 'success') {
          setAllFamily(res.data.response);
        }
      })
      .catch(err => {
        console.log('Error', JSON.stringify(err));
      });
  };
  const handlePress = () => false;
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
      .post('http://192.168.193.116:3001/users', {
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
        console.log(`res.data`, res.data);
        if (res.data.status == 'success') {
          axios
            .post(`http://192.168.193.116:3001/FamilyMember`, {
              familyId: selectedFamilyID,
              personId: res.data.response.insertId,
            })
            .then(resss => {
              console.log(`resss.data`, resss.data);
              if (resss.data.status == 'success') {
                Alert.alert('Amjilttai nemegdlee ger bul');
              }
            })
            .catch(err => {
              console.log('Error', JSON.stringify(err));
            });
          Navigation.navigate('Эцэг эх сонгох', {
            ID: selectedFamilyID,
            childPersonId: res.data.response.insertId,
          });
        }
      })
      .catch(err => {
        console.log('Error', JSON.stringify(err));
      });
  };
  const openFamMod = () => {
    setModalShow(true);
  };
  const insertFamily = () => {
    console.log(`insertFamilyhahahaha`, insertFamily);
    setLoading(true);
    axios
      .post('http://192.168.193.116:3001/SearchFamily', {
        Name: state.Name,
        Description: state.Description,
        Created_Date: `${date.getFullYear()}-${
          date.getMonth() - 1
        }-${date.getDate()}`,
      })
      .then(() => {
        setLoading(false);
        setModalShow(false);
        Alert.alert('Amjilttai nemegdev');
      })
      .catch(err => {
        setLoading(false);
        setModalShow(false);
        console.log(`err****`, err);
      });
  };

  const addNewPerson = () => {
    props.navigation.navigate('TreeModel');
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Зураг</Text>
      <View style={styles.profileImageContainer}>
        <Image
          style={{height: 100, width: 100}}
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
              fontSize: 28,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Овог нэр</Text>
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
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <DatePicker
            modal
            open={open}
            style={{width: 260, height: 50}}
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
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
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
            style={{
              borderWidth: 1,
              borderColor: '#e1e1e1',
              borderRadius: 10,
              height: 40,
              paddingHorizontal: 10,
              color: '#585858',
            }}
            // editable={false}
            value={state.date_of_birth.toLocaleDateString()}
            placeholder="Select date"
            onPressIn={() => setOpen(true)}
          />
        </View>
      </View>
      <Text style={styles.title}>Гэр бүл сонгох</Text>
      <View>
        <Modal visible={modalShow} transparent>
          <View
            style={{
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
            }}>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                color: '#000',
                fontSize: 14,
              }}>
              Гэр Бүлийн нэр
            </Text>
            <TextInput
              style={{
                marginLeft: 20,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#e1e1e1',
                width: '90%',
                height: 50,
                marginTop: 10,
                color: '#000',
              }}
              value={Name}
              onChangeText={value => setState1({...state, Name: value})}
              placeholder="Хэний гэр бүл вэ?"
              placeholderTextColor={'#a0a0a0'}
            />
            <Text
              style={{
                marginLeft: 25,
                marginTop: 10,
                color: '#000',
              }}>
              Нэмэлт мэдээлэл
            </Text>
            <TextInput
              style={{
                marginLeft: 20,

                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#e1e1e1',
                width: '90%',
                height: 50,
                color: '#000',
                marginTop: 10,
              }}
              value={Description}
              onChangeText={value => setState1({...state, Description: value})}
              placeholder="Нэмэлт мэдээлэл"
              placeholderTextColor={'#a0a0a0'}
            />
            <Text
              style={{
                marginLeft: 30,
                color: '#000',
              }}>
              Хэзээ Үүссэн?
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#e1e1e1',
                width: '90%',
                height: 50,
                marginTop: 10,
                marginLeft: 20,
                color: '#000',
              }}
              value={Created_Date}
              onChangeText={value => setState1({...state, Created_Date: value})}
              placeholder="Хэзээ үүссэн бэ?"
              placeholderTextColor={'#a0a0a0'}
            />
            <Text
              style={{
                marginLeft: 30,
                color: '#000',
              }}>
              Овгийн нэр
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#e1e1e1',
                width: '90%',
                height: 50,
                marginTop: 10,
                marginLeft: 20,
                color: '#000',
              }}
              value={urgiin_ovog_ID}
              onChangeText={value =>
                setState1({...state, urgiin_ovog_ID: value})
              }
              placeholder="Ямар овог вэ?"
              placeholderTextColor={'#a0a0a0'}
            />

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
                <Text style={{height: 30, color: '#fff', marginTop: 7}}>
                  Нэмэх
                </Text>
              )}
            </Button>
          </View>
        </Modal>
        <Select
          onValueChange={val => {
            const name = val.split('#')[0];
            const id = val.split('#')[1];
            setFamilyName(val);
            setSelectedFamilyID(id);
          }}>
          {/* <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />*/}
          {!isEmpty(AllFamily) ? (
            AllFamily?.map(el => (
              <Select.Item label={el.Name} value={`${el.Name}#${el.ID}`} />
            ))
          ) : (
            <View>
              <Button onPress={openFamMod}> Гэр бүл нэмэх</Button>
            </View>
          )}
        </Select>
        {/*<TextInput
          style={{
            borderWidth: 1,
            borderColor: '#e1e1e1',
            borderRadius: 10,
            height: 40,
            paddingHorizontal: 10,
            color: '#585858',
          }}
          // editable={false}
          value={familyId}
          placeholder="Хэний гэр бүл"
          onChangeText={val => setfamilyId(val)}
          onPressIn={() => setOpen(false)}
        />*/}
      </View>
      <Text style={styles.title}>Одоогийн төлөв</Text>
      <Radio.Group
        name="isAliveGroup"
        style={{flexDirection: 'row'}}
        onChange={value => {
          setisAlive(value);
        }}>
        <Radio value="1" my={1}>
          Амьд
        </Radio>
        <Radio value="0" my={1} style={{marginLeft: 20}}>
          Нас барсан
        </Radio>
      </Radio.Group>
      <Text style={styles.title}>Нас барсан өдөр</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          editable={isAlive == '0'}
          style={[
            styles.inputDate,
            {
              borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0',
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
              borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0',
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
              borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0',
            },
          ]}
          placeholder="Жил"
          placeholderTextColor={'#a0a0a0'}
        />
      </View>
      <Text style={styles.title}>Хүйс</Text>
      <Radio.Group
        name="isAliveGroup"
        style={{flexDirection: 'row'}}
        onChange={value => {
          setGender(value);
        }}>
        <Radio value="1" my={1}>
          Эр
        </Radio>
        <Radio value="2" my={1} style={{marginLeft: 20}}>
          Эм
        </Radio>
        {/*<Radio value="2" my={1} style={{marginLeft: 20}}>
          Бусад
      </Radio> */}
      </Radio.Group>
      <Text style={styles.title}>Тэмдэглэл</Text>
      <TextInput
        style={styles.note}
        onChangeText={value => setState({...state, Person_Intro: value})}
      />
      <TouchableOpacity
        style={styles.Addbutton}
        alignContent="center"
        marginBottom="20"
        backgroundColor={'#c24e00'}
        onPress={openFamMod}>
        <Text style={styles.ButtonTitle}>Гишүүн нэмэх</Text>
      </TouchableOpacity>
      <View
        style={{
          height: 500,
          width: '90%',
          // backgroundColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginLeft: 10,
        }}></View>
    </ScrollView>
  );
};

export default AddPeople;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  profileImageContainer: {
    position: 'relative',
    width: 120,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 10,
  },
  Addbutton: {
    borderWidth: 1,
    padding: 18,
    borderColor: 'black',
    backgroundColor: 'c24e00',
    color: 'black',
    borderRadius: 35,
  },
  ButtonTitle: {
    color: '#c24e00',
    alignSelf: 'center',
  },
  title: {
    color: '#585858',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 15,
    height: 40,
    color: '#585858',
    paddingHorizontal: 10,
    marginVertical: 5,
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
    height: 100,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
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
});
