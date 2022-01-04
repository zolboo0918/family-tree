import React, {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SideMenuHeader = () => {
  const goLogin = () => {
    setPosition('');
    navigationRef.current.navigate('Login');
  };
  return (
    <View style={{borderTopRightRadius: 50}}>
      <View style={styles.container}>
        <View style={styles.userInfoSection}>
          <Image
            source={{
              uri: 'https://th.bing.com/th/id/R.65be7e5c33302fdf7504bd1c5e7aa3fa?rik=96GMteNq1x18Mg&pid=ImgRaw&r=0',
            }}
            style={styles.userImage}
          />
          <Text style={styles.userName}>Тэмүүлэн</Text>
          <Text style={styles.userId}>#001</Text>
        </View>
      </View>
    </View>
  );
};

export default SideMenuHeader;

const styles = StyleSheet.create({
  //sidemenu  heder style
  container: {
    backgroundColor: '#B2E392',
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    marginBottom: 5,
    height: 186,
  },
  profileheaderBackground: {
    height: 250,
    width: '100%',
    opacity: 0.15,
  },
  headerButton: {
    bottom: 30,
    width: 150,
    position: 'absolute',
  },
  loginButton: {
    fontSize: 22,
    fontWeight: '700',
  },

  headerButton: {
    bottom: 30,
    width: setWidth(40),
    position: 'absolute',
  },
  loginButton: {
    fontSize: setHeight(2.45),
    fontWeight: '700',
  },

  //main header style
  contain: {
    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
    height: setHeight(7),
    flexDirection: 'row',
    backgroundColor: '#fff',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 30,
    // elevation: 3,
  },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 60,
  },
  contentCenter: {
    maxWidth: setWidth(80),
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginLeft: -30,
    justifyContent: 'center',
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
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userInfoSection: {
    position: 'absolute',
    top: 30,
    paddingLeft: 30,
  },
  userImage: {
    borderWidth: 2,
    borderColor: '#e1e1e1',
    height: setHeight(7.5),
    width: setHeight(7.5),
    backgroundColor: 'white',
    borderRadius: 50,
  },
  userName: {
    paddingRight: 10,
    color: '#fff',
    fontSize: setHeight(2.7),
    fontWeight: '700',
    marginTop: setHeight(1.2),
  },
  userId: {
    color: '#fff',
    fontSize: setHeight(1.7),
    fontWeight: '500',
    marginTop: setHeight(1.2),
  },
});

import {Platform, StatusBar} from 'react-native';
import {setHeight, setWidth} from '../constants';
