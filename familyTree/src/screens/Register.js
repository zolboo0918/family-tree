import Axios from 'axios';
import {Toast} from 'native-base';
import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLORS, URL} from '../constants';

const Register = props => {
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [fName, setFirstName] = useState('');
  const [lName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [RegNumber, setRegNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [UserName, setUserName] = useState('');

  const handleRegister = () => {
    Axios.post(`${URL}/users`, {
      lName: lName,
      fName: fName,
      RegNumber: RegNumber,
      eMail: email,
      userName: UserName,
      Password: Password,
    }).then(response => {
      if (response.data.status == 'success') {
        props.navigation.navigate('Login');
      } else {
        Toast.show({title: 'Алдаа гарлаа'});
      }
    });
  };

  return (
    <ImageBackground
      source={require('../assets/img/back.png')}
      style={styles.backgroundImg}>
      <View style={styles.body}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.loginText}>Бүртгүүлэх</Text>
          <Text style={styles.inputLabel}>Регистрийн дугаар</Text>
          <TextInput
            style={styles.input}
            value={RegNumber}
            onChangeText={setRegNumber}
          />
          <Text style={styles.inputLabel}>Овог</Text>
          <TextInput
            style={styles.input}
            value={lName}
            onChangeText={setLastName}
          />
          <Text style={styles.inputLabel}>Нэр</Text>
          <TextInput
            style={styles.input}
            value={fName}
            onChangeText={setFirstName}
          />
          <Text style={styles.inputLabel}>И-мэйл</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.inputLabel}>Нууц Үг</Text>
          <TextInput
            style={styles.input}
            value={Password}
            onChangeText={setPassword}
          />
          <Text style={styles.inputLabel}>Системд ашиглагдах нэр</Text>
          <TextInput
            style={styles.input}
            value={UserName}
            onChangeText={setUserName}
          />
          <TouchableOpacity
            style={styles.button}
            color={COLORS.BASE_COLOR}
            onPress={handleRegister}>
            <Text style={styles.buttonText}>Бүртгүүлэх</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerContainer}
            color={COLORS.BASE_COLOR}
            onPress={() => props.navigation.goBack()}>
            <Text style={styles.register}>Нэвтрэх</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  body: {
    position: 'absolute',
    bottom: 0,
    height: 'auto',
    width: '100%',
    paddingHorizontal: 40,
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
    width: '100%',
    padding: 10,
    height: 35,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BASE_COLOR,
  },
  inputLabel: {
    color: '#585858',
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
    marginTop: 40,
    width: 200,
    height: 40,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 40,
  },
  register: {
    marginBottom: 30,
    alignSelf: 'center',
    color: COLORS.BASE_COLOR,
  },
});
