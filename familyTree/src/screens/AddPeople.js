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
} from 'react-native';
import {Button, Checkbox, Radio} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../constants';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

const AddPeople = () => {
  const bpParams = {
    lName: '',
    fName: '',
    Person_Intro: '',
    Profile_Picture: '',
    Marriage_Status: null,
    Marriage_Date: {},
    gender: null,
    isAlive: null,
    Marriage_Status: null,
    Marriage_Date: new Date(),
    date_of_birth: new Date(),
    date_of_death: '',
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isAlive, setisAlive] = useState();
  const [state, setState] = useState(bpParams);
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
      .post('http://192.168.193.125:3001/users', {
        lName: state.lName,
        fName: state.fName,
        Profile_Picture: state.Profile_Picture,
        Marriage_Status: state.Marriage_Status,
        Marriage_Date: state.Marriage_Date,
        date_of_birth: state.date_of_birth,
        date_of_death: state.date_of_death,
      })
      .then(res => {
        console.log('Success', res);
        if (res.data.status == 'success') {
          Alert.alert('Amjilttai nemegdlee');
        }
      })
      .catch(err => {
        console.log('Error', JSON.stringify(err));
      });
  };
  console.log(`date`, date);
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
              // setDate(date);
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
      <Text style={styles.title}>Хурим хийсэн өдөр (Сонголттой)</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.inputDate}
          placeholder="Өдөр"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          style={styles.inputDate}
          placeholder="Сар"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          style={styles.inputDate}
          placeholder="Жил"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
      </View>
      <Text style={styles.title}>Амьд эсэх</Text>
      <Radio.Group
        name="isAliveGroup"
        style={{flexDirection: 'row'}}
        onChange={value => {
          setIsAlive(value);
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
            {borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0'},
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
            {borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0'},
          ]}
          placeholder="Сар"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          keyboardType="number-pad"
          editable={isAlive == '0'}
          style={[
            styles.inputDate,
            {borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0'},
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

      <Button
        styles={styles.title1}
        title1="Hello"
        height={50}
        width={250}
        marginBottom={90}
        marginTop={-22}
        marginLeft={60}
        justifyContent={'center'}
        alignItems={'center'}
        bgColor={'#f1f1f1'}
        onPress={AddNewPerson}
      />
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
  title1: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'black',
    backgroundColor: 'red',
    color: 'black',
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
    borderRadius: 15,
    borderWidth: 0.1,
    alignItems: 'center',
    alignContent: 'space-around',
  },
});
