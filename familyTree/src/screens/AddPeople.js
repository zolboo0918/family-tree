import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, Radio} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../constants';
import ImagePicker from 'react-native-image-crop-picker';

const AddPeople = () => {
  const [isAlive, setIsAlive] = useState();
  const [gender, setGender] = useState();
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      console.log(image);
    });
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Зураг</Text>
      <View style={styles.profileImageContainer}>
        <Image
          style={{height: 100, width: 100}}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          }}
        />
        <TouchableOpacity onPress={uploadImage}>
          <Icon
            name="pluscircle"
            style={{
              position: 'absolute',
              color: COLORS.TREE_COLOR,
              bottom: 0,
              right: -6,
              fontSize: 28,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Овог нэр</Text>
      <TextInput
        style={styles.input}
        placeholder="Овог"
        placeholderTextColor={'#a0a0a0'}
      />
      <TextInput
        style={styles.input}
        placeholder="Нэр"
        placeholderTextColor={'#a0a0a0'}
      />
      <Text style={styles.title}>Төрсөн өдөр</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.inputDate}
          placeholder="Өдөр"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          style={styles.inputDate}
          placeholder="Сар"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          style={styles.inputDate}
          placeholder="Жил"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
      </View>
      <Text style={styles.title}>Хурим хийсэн өдөр (Сонголттой)</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.inputDate}
          placeholder="Өдөр"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          style={styles.inputDate}
          placeholder="Сар"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          style={styles.inputDate}
          placeholder="Жил"
          keyboardType="number-pad"
          placeholderTextColor={'#a0a0a0'}
        />
      </View>
      <Text style={styles.title}>Амьд эсэх</Text>
      <Radio.Group
        name="isAliveGroup"
        style={{flexDirection: 'row'}}
        onChange={value => {
          setIsAlive(value);
        }}>
        <Radio value="1" my={1}>
          Амьд
        </Radio>
        <Radio value="0" my={1} style={{marginLeft: 20}}>
          Нас барсан
        </Radio>
      </Radio.Group>
      <Text style={styles.title}>Нас барсан өдөр</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          editable={isAlive == '0'}
          style={[
            styles.inputDate,
            {borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0'},
          ]}
          keyboardType="number-pad"
          placeholder="Өдөр"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          editable={isAlive == '0'}
          keyboardType="number-pad"
          style={[
            styles.inputDate,
            {borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0'},
          ]}
          placeholder="Сар"
          placeholderTextColor={'#a0a0a0'}
        />
        <TextInput
          keyboardType="number-pad"
          editable={isAlive == '0'}
          style={[
            styles.inputDate,
            {borderBottomColor: isAlive == '0' ? COLORS.TREE_COLOR : '#a0a0a0'},
          ]}
          placeholder="Жил"
          placeholderTextColor={'#a0a0a0'}
        />
      </View>
      <Text style={styles.title}>Хүйс</Text>
      <Radio.Group
        name="isAliveGroup"
        style={{flexDirection: 'row'}}
        onChange={value => {
          setGender(value);
        }}>
        <Radio value="1" my={1}>
          Эр
        </Radio>
        <Radio value="0" my={1} style={{marginLeft: 20}}>
          Эм
        </Radio>
        <Radio value="2" my={1} style={{marginLeft: 20}}>
          Бусад
        </Radio>
      </Radio.Group>
      <Text style={styles.title}>Тэмдэглэл</Text>
      <TextInput style={styles.note} />
    </ScrollView>
  );
};

export default AddPeople;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  profileImageContainer: {
    position: 'relative',
    width: 120,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 10,
  },
  title: {
    color: '#585858',
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
  inputDate: {
    borderBottomWidth: 1,
    borderColor: COLORS.TREE_COLOR,
    height: 40,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#585858',
    margin: 5,
  },
  note: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginTop: 10,
    marginBottom: 50,
  },
});
