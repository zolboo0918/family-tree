import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {getBasePerson} from '../service/common';

const CardItem = props => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getBasePerson(props.item.base_person_ID)
      .then(res => {
        setUser({
          profilePicture: res.Profile_Picture,
          fName: res.fName,
        });
      })
      .catch(err => console.log(`err`, err));
  }, []);
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.listImage}>
        <Image
          resizeMode="cover"
          style={styles.listImage}
          source={{
            uri: props.item.img
              ? 'img'
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKL1UJwYLq5HdSe5K_8bqnfUFk3BiYvap7Ww&usqp=CAU',
          }}
        />
        <Image
          resizeMode="cover"
          style={styles.profileImg}
          source={{
            uri: user.profilePicture
              ? user.profilePicture
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY-vJ07Repan238qwOLHGf1vsdK5Mjr-IyBA&usqp=CAU',
          }}
        />
      </View>
      <View style={{padding: 5}}>
        <Text style={styles.title}>{props.item.Name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={styles.listText}>{user.fName}</Text>
          <Text style={styles.listText}>{props.item.Date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    width: 215,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  listImage: {
    // marginTop: 70,
    height: 128,
    width: '100%',
    borderRadius: 10,
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#585858',
  },
  listText: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#a0a0a0',
    paddingLeft: 5,
    paddingBottom: 5,
  },
});
