import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';
import {
  Alert,
  Button,
  Dimensions,
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
import {COLORS} from '../constants';

const Login = props => {
  const [userName, setUserName] = useState('');
  const [RegNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setpasswordShow] = useState(true);

  const handleLogin = () => {
    Axios.post('http://192.168.193.87:3001/Login', {
      UserName: userName,
      Password: password,
    })
      .then(response => {
        // alert(JSON.stringify(response.data));
        console.log(response.data);
        // Toast.show('This is a toast.');
        if (response.data.status == 'success') {
          props.navigation.navigate('Home');
        } else {
          Alert.alert('aldaa', response.data.response);
        }
      })
      .catch(err => {
        console.log(err);
        // Toast.show('This is a error.');
      });
  };

  const registerButtonPress = () => {
    props.navigation.navigate('Register');
  };

  // setАжилчдынЖагсаалт(response.data)

  return (
    <ImageBackground
      source={require('../assets/img/background.jpg')}
      style={styles.backgroundImg}>
      <KeyboardAvoidingView style={styles.body}>
        <Text style={styles.loginText}>Нэвтрэх</Text>
        <Text style={styles.inputLabel}>Регистрийн дугаар</Text>
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
                  color={COLORS.BASE_COLOR}
                  onPress={() => setpasswordShow(!passwordShow)}
                />
              ) : (
                <Icon
                  color={COLORS.BASE_COLOR}
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
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  body: {
    position: 'absolute',
    bottom: 0,
    height: 'auto',
    width: '100%',
    paddingLeft: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    color: COLORS.BASE_COLOR,
  },
  input: {
    width: '90%',
    padding: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BASE_COLOR,
  },
  inputLabel: {
    color: '#a0a0a0',
    marginTop: 20,
  },
  passwordIconContainer: {
    paddingRight: 40,
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
    marginLeft: -40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE_COLOR,
    shadowColor: COLORS.BASE_COLOR,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 50,
    marginLeft: -40,
  },
  register: {
    alignSelf: 'center',
    color: COLORS.BASE_COLOR,
    marginBottom: 40,
  },
});
