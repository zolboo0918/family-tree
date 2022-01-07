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
import {Button, Checkbox, Radio, Select} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, URL} from '../constants';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {loginUserInfo} from './Login';

const SelectParent = props => {
  const parentID = {
    father_person_ID: '',
    mother_person_ID: '',
    child_person_ID: '',
    eventAction: '',
    eventStartDate: new Date(),
    eventEndDate: new Date(),
  };
  const [father, setFather] = useState([]);
  const [mother, setMother] = useState([]);
  // const [child, setChild] = useState();
  const [family, setFamily] = useState();
  const [father_person_ID, setFather_person_ID] = useState();
  const [mother_person_ID, setMother_Person_ID] = useState();
  const [child_person_ID, setChild_Person_ID] = useState();
  const [eventAction, setEventAction] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(parentID);

  const Navigation = useNavigation();
  // const [AllParents, setAllParents] = useState([]);
  const [fathers, setFathers] = useState([]);
  const [mothers, setMothers] = useState([]);
  const route = useRoute();

  const ID = route.params.ID;
  const childPersonId = props.route.params.childPersonId;

  useEffect(() => {
    getAllParents();
  }, []);

  const getAllParents = () => {
    axios
      .get(`${URL}/FamilyMember/${loginUserInfo[0].ID}`)
      .then(res => {
        res.data.response.forEach(el => {
          axios.get(`${URL}/users/${el.personId}`).then(userResult => {
            if (userResult.data.response.gender_ID == '2') {
              setMother(prev => [
                ...prev,
                {...el, ...userResult.data.response},
              ]);
            } else {
              setFathers(prev => [
                ...prev,
                {...el, ...userResult.data.response},
              ]);
            }
          });
        });
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  const insertParents = () => {
    console.log(`father_person_ID`, father_person_ID);
    console.log(`mother_person_ID`, mother_person_ID);
    console.log(`childPersonId`, childPersonId);
    console.log(`eventAction`, eventAction);
    axios
      .post(`${URL}/Genelogy`, {
        father_person_ID: father_person_ID,
        mother_person_ID: mother_person_ID,
        child_person_ID: childPersonId,
        eventAction: eventAction,
        eventStartDate: `${state.eventStartDate.getFullYear()}-${
          state.eventStartDate.getMonth() - 1
        }-${state.eventStartDate.getDate()}`,
        // eventEndDate: `${state.eventEndDate.getFullYear()}-${
        //   state.eventEndDate.getMonth() - 1
        // }-${state.eventEndDate.getDate()}`,
      })
      .then(res => {
        console.log(`res.data`, res.data);
        if (res.data.status == 'success') {
          Alert.alert('Amjilttai');
        }
      })
      .catch(err => {
        console.log('hahaha aldaa', JSON.stringify(err));
      });
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        width: 350,
        marginLeft: 25,
        marginTop: 100,
      }}>
      <Select
        placeholder="Аав сонгох"
        style={{
          borderColor: '#e1e1e1',
          height: 40,
          alignItems: 'center',
          paddingHorizontal: 10,
          color: '#585858',
        }}
        // editable={false}
        placeholder="Аав сонгох"
        onValueChange={val => setFather_person_ID(val)}>
        {fathers.map(el => {
          return <Select.Item label={el[0].fName} value={el[0].ID} />;
        })}
      </Select>
      <Select
        placeholder="Ээж сонгох"
        style={{
          borderWidth: 0,
          borderColor: '#e1e1e1',
          borderRadius: 10,
          height: 40,
          paddingHorizontal: 10,
          color: '#585858',
        }}
        // editable={false}
        placeholder="Ээж сонгох"
        onValueChange={val => setMother_Person_ID(val)}>
        {fathers.map(el => {
          return <Select.Item label={el[0].fName} value={el[0].ID} />;
        })}
      </Select>
      <TextInput
        style={styles.input}
        onChangeText={value => setEventAction(value)}
        placeholder="Юу нь вэ?"
        placeholderTextColor={'#a0a0a0'}
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
        value={state.eventStartDate.toLocaleDateString()}
        placeholder="Эхэлсэн огноо"
        onPressIn={() => setOpen(true)}
      />
      <View style={{flexDirection: 'row'}}>
        <DatePicker
          modal
          open={open}
          style={{width: 260, height: 50}}
          date={state.eventStartDate}
          onConfirm={date => {
            setOpen(false);
            setState({...state, eventStartDate: date});
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
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
          onDateChange={date => setState({...state, eventStartDate: date})}
          // onDateChange={date => {
          //   // this.setState({date: date});
          //   // setDate(date);
          //   console.log(`date`, date);
          //   setState({...state, eventStartDate: date});
          // }}
        />
      </View>
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
        value={state.eventEndDate.toLocaleDateString()}
        placeholder="Дуусгавар болсон огноо"
        onPressIn={() => setOpen(true)}
      />
      <View style={{flexDirection: 'column'}}>
        <DatePicker
          modal
          open={false}
          style={{width: 260, height: 50}}
          date={state.eventEndDate}
          onConfirm={date => {
            setOpen(false);
            // setState({...state, eventEndDate: date});
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
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
          onDateChange={dates => {
            // this.setState({date: date});
            // setDate(date);
            setState({...state, eventEndDate: dates});
          }}
        />
      </View>

      <Button
        height={30}
        width={100}
        marginTop={50}
        marginLeft={130}
        bgColor={'#70A44E'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={20}
        onPress={insertParents}>
        <Text style={{height: 30, color: '#fff', marginTop: 7}}>Нэмэх</Text>
      </Button>
    </View>
  );
};

export default SelectParent;

const styles = StyleSheet.create({
  title: {
    color: '#000000',
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
});
