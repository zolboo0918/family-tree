import axios from 'axios';
import React, {Children, useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProfileContext} from '../context/ProfileContext';
import TabViewExample from '../navigation/TabNavigator';
import {loginUserInfo} from './Login';

// import MyTabs from '../navigation/TabNavigator';
const lookTopNode = () => {};
const Profile = () => {
  const [father, setFather] = useState();
  const [Mother, setMother] = useState();
  // const [child, setChild] = useState();
  const [family, setFamily] = useState();

  useEffect(() => {
    axios
      .get(`${}/${loginUserInfo[0]}`)
      .then(res => {
        setFather(res.data.response.father);
        setMother(res.data.response.Mother);
        // setChildren(res.data.response.children);
        setFamily(res.data.response.family);
        console.log('res', res.data.response);
      });
  }, []);

  const getFather = () => {
    axios
      .get(`${}/${loginUserInfo[0]}`)
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

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: 'https://static01.nyt.com/images/2019/11/17/books/review/17Salam/Salam1-superJumbo.jpg',
            }}
            style={styles.profileImage}
          />
          <Image
            source={{
              uri: 'https://static01.nyt.com/images/2019/11/17/books/review/17Salam/Salam1-superJumbo.jpg',
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={styles.userName}>Suuskaroni</Text>
          <Text style={styles.phone}>99391547</Text>
          <Text style={styles.phone}>Ууганбаяр</Text>
        </View>
        <TouchableOpacity onPress={getFather} style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Дээш харах</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: '100%', width: '100%'}}>
        <TabViewExample />
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
    height: 88,
    width: 88,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    color: '#000',
  },
  phone: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  removeBtn: {
    borderRadius: 30,
    width: 85,
    height: 36,
    backgroundColor: '#fb6e50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  removeBtnText: {
    fontSize: 14,
    color: '#fff',
  },
});
