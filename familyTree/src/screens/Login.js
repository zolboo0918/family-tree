import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import {COLORS, getWidth} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

export let loginUserInfo = {};

const Login = props => {
  const [userName, setUserName] = useState('Suuskaroni');
  const [password, setPassword] = useState('Mongolia9939');
  const [passwordShow, setpasswordShow] = useState(true);

  const handleLogin = () => {
    Axios.post(`${}/users/Login`, {
      userName: userName,
      Password: password,
    })
      .then(response => {
        // alert(JSON.stringify(response.data));
        // Toast.show('This is a toast.');
        if (response.data.status == 'success') {
          // props.navigation.navigate('Home');
          loginUserInfo = response.data.response;
          props.navigation.replace('Bottom');
          console.log(`loginUserInfo***`, loginUserInfo);
        } else {
          Alert.alert('aldaa', response.data.response);
        }
      })
      .catch(err => {
        Alert.alert('aldaa', err.response.data);
        // Toast.show('This is a error.');
      })
      .finally(() => {});
  };

  const registerButtonPress = () => {
    props.navigation.navigate('Register');
  };

  // setАжилчдынЖагсаалт(response.data)

  return (
    <View style={styles.backgroundImg}>
      <Image
        source={require('../assets/img/image71.png')}
        resizeMode="contain"
        style={{height: 177, width: 160, alignSelf: 'center', marginTop: 50}}
      />
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text style={styles.headerText}>Ургийн </Text>
        <Text style={styles.headerText2}>мод</Text>
      </View>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1, y: 1}}
        colors={['#86CC5A', '#70A44E']}
        style={styles.body}>
        <Image
          source={require('../assets/img/back.png')}
          resizeMode="contain"
          style={styles.backImage}
        />
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.inputLabel}>Нэвтрэх нэр</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
          />
          <Text style={styles.inputLabel}>Нууц үг</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={passwordShow}
              onChangeText={setPassword}
            />
            {password != '' && (
              <View style={styles.passwordIconContainer}>
                {passwordShow ? (
                  <Icon
                    name="eye"
                    size={17}
                    color={'#fff'}
                    onPress={() => setpasswordShow(!passwordShow)}
                  />
                ) : (
                  <Icon
                    color={'#fff'}
                    name="eye-with-line"
                    size={17}
                    onPress={() => setpasswordShow(!passwordShow)}
                  />
                )}
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.button}
            color={COLORS.BASE_COLOR}
            onPress={handleLogin}>
            <Text style={styles.buttonText}>Нэвтрэх</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerContainer}
            color={COLORS.BASE_COLOR}
            onPress={registerButtonPress}>
            <Text style={styles.register}>Бүртгүүлэх</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    position: 'absolute',
    bottom: 0,
    height: 'auto',
    width: '100%',
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
  },
  backImage: {
    width: '100%',
    height: 535,
    position: 'absolute',
    opacity: 0.1,
  },
  headerText: {
    color: '#663333',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerText2: {
    color: '#86CC5A',
    fontSize: 22,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    color: COLORS.BASE_COLOR,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 40,
    borderBottomWidth: 1,
    color: '#fff',
    borderBottomColor: '#fff',
  },
  inputLabel: {
    color: '#fff',
    marginTop: 20,
  },
  passwordIconContainer: {
    paddingRight: 10,
    position: 'absolute',
    right: 0,
    top: 15,
  },
  button: {
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 50,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // shadowColor: COLORS.BASE_COLOR,
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.0,

    // elevation: 24,
  },
  buttonText: {
    color: '#585858',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 50,
  },
  register: {
    alignSelf: 'center',
    color: '#fff',
    marginBottom: 40,
  },
});
