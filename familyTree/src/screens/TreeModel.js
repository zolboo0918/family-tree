import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants';

const Tree = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={['#9BAEFF', '#FF9BFC']}
      style={styles.background}>
      <Image
        source={require('../../assets/working.png')}
        style={{height: 280, width: 260}}
      />
      <Text style={styles.text}>ЭНЭ ХУУДАС ХӨГЖҮҮЛЭГДЭЖ БАЙНА</Text>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Буцах</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Tree;

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: '10%',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    height: 55,
    width: '45%',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
  },
});
