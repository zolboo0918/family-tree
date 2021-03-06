import Icon from 'react-native-vector-icons/Fontisto';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {isEmpty} from 'lodash';
import {URL} from '../constants';
import axios from 'axios';
import {getBasePerson} from '../service/common';

const BigCardItem = props => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getBasePerson(props.item.base_person_ID)
      .then(res => {
        setUser({
          profilePicture: res.Profile_Picture,
          fName: res.fName,
          lName: res.lName,
        });
      })
      .catch(err => console.log(`err`, err));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity>
          <Image
            resizeMode="cover"
            style={styles.profileImg}
            source={{
              uri: !isEmpty(user.profilePicture)
                ? user.profilePicture
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY-vJ07Repan238qwOLHGf1vsdK5Mjr-IyBA&usqp=CAU',
            }}
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.userName}>{user.fName}</Text>
          <Text style={styles.description}>{user.lName}</Text>
        </View>
      </View>
      <Image
        resizeMode="cover"
        style={styles.listImage}
        source={{uri: props.item.picture}}
      />
      <Text>{props.item.description}</Text>
      <View style={styles.bottom}>
        <View style={styles.bottomItem}>
          <Icon name="heart-alt" style={styles.icon} />
          <Text style={styles.bottomItemText}>{props.item.likeCount}</Text>
        </View>
        <View style={styles.bottomItem}>
          <Icon name="comment" style={styles.icon} />
          <Text style={styles.bottomItemText}>{props.item.commentCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default BigCardItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 16,
    width: '97%',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#585858',
  },
  description: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  listImage: {
    marginTop: 10,
    height: 315,
    width: '100%',
    borderRadius: 15,
  },
  profileImg: {
    height: 42,
    width: 42,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  bottomItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
    color: '#585858',
  },
  bottomItemText: {
    fontSize: 16,
    color: '#585858',
  },
  listText: {
    alignSelf: 'flex-start',
    fontSize: 12,
    paddingLeft: 5,
    paddingBottom: 5,
  },
});
