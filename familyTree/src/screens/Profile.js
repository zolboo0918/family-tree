import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TabViewExample from '../navigation/TabNavigator';
// import MyTabs from '../navigation/TabNavigator';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={{
            uri: 'https://static01.nyt.com/images/2019/11/17/books/review/17Salam/Salam1-superJumbo.jpg',
          }}
          style={styles.profileImage}
        />
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={styles.userName}>Б.Батсайхан</Text>
          <Text style={styles.phone}>99105421</Text>
          <Text style={styles.phone}>@98475</Text>
        </View>
        <TouchableOpacity style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Хасах</Text>
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
    fontSize: 18,
    color: '#585858',
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
