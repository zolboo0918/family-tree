import axios from 'axios';
import {result, setWith} from 'lodash';
import {AlertDialog, Button, Select, StatusBar, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import BigCardItem from '../components/BigCardItem';
import CardItem from '../components/CardItem';
import List from '../components/List';
import SmallCircleItem from '../components/SmallCircleItem';
import {COLORS, setHeight, setWidth, URL} from '../constants';
import {dataEvent, datafriends, dataPost} from '../testData';
import ImagePicker from 'react-native-image-crop-picker';
import {loginUserInfo} from './Login';
import Icon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const EventBook = () => {
  const [modalShow, setModalShow] = useState(false);
  const [EventType, setEventType] = useState();
  const [EventName, setEventName] = useState('');
  const [EventPicture, setEventPicture] = useState('');
  const [Description, setDescription] = useState('');
  const [eventInfo, setEventInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const date = new Date();

  useEffect(() => {
    getEvents();
    getPosts();
  }, []);

  const getEvents = () => {
    axios.get(`${URL}/EventBook`).then(res => {
      if (res.data.status == 'success') {
        setEventInfo(res.data.response);
      }
    });
  };

  const getPosts = () => {
    axios
      .get(`${URL}/Posts`)
      .then(result => {
        if (result.data.status == 'success') {
          setPosts(result.data.response);
        }
      })
      .catch(error => console.log(`error***14`, error));
  };

  const InsertEvent = () => {
    setLoading(true);
    axios
      .post(`${URL}/EventBook`, {
        Name: EventName,
        Date: `${date.getFullYear()}-${
          date.getMonth() - 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        base_person_ID: loginUserInfo[0].ID,
        event_type_ID: EventType,
        Picture: EventPicture,
      })
      .then(res => {
        setLoading(false);
        Alert.alert('Эвент амжилттай нэмэгдлээ');
        setModalShow(false);
        getEvents();
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Алдаа', JSON.stringify(err));
      });
  };
  const InsertPost = () => {
    axios
      .post(`${URL}/Posts`, {
        description: Description,
        created_date: `${date.getFullYear()}${
          date.getMonth() - 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        base_person_ID: loginUserInfo[0].ID,
        Picture: picture,
      })
      .then(res => {
        getPosts();
        setPicture(null);
        Alert.alert('Амжилттай постлогдлоо');
      })
      .catch(err => {
        Alert.alert('Алдаа', JSON.stringify(err));
      });
  };
  const uploadImage = type => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      if (type == 'post') {
        setPicture(image.path);
      } else {
        setEventPicture(image.path);
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.story}>
        <SmallCircleItem
          item={{
            img: 'https://i1.trekearth.com/photos/5205/boy.jpg',
            title: 'Чиний түүх',
          }}
          user={true}
        />
        <List
          data={datafriends}
          horizontal={true}
          style={{marginTop: -30}}
          renderItem={function (item) {
            return <SmallCircleItem item={item} />;
          }}
        />
      </View>
      <View>
        <View>
          <TextInput
            multiline
            style={styles.container1}
            value={Description}
            onChangeText={val => setDescription(val)}
            placeholder="Пост Оруулах"
          />
          {picture ? (
            <Image style={styles.postImage} source={{uri: picture}} />
          ) : (
            <></>
          )}
          <Button style={styles.addPost} onPress={InsertPost}>
            <Icon name="send" style={styles.postIcon} />
          </Button>
          <Button style={styles.addPost2} onPress={() => uploadImage('post')}>
            <Icon name="image" style={styles.postIcon} />
          </Button>
        </View>
        <View style={styles.postButtonContainer}></View>
      </View>
      <View style={styles.events}>
        <View>
          <Modal
            transparent
            visible={modalShow}
            animationType="fade"
            style={{}}>
            <View style={styles.modalContainer}>
              <Button
                style={styles.close}
                onPress={() => {
                  setModalShow(false);
                  setLoading(false);
                }}>
                <EvilIcon name="close-o" style={styles.closeIcon} />
              </Button>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  placeholder="Үйл явдлын нэр"
                  style={styles.input1}
                  value={EventName}
                  onChangeText={setEventName}
                />
                <Select
                  placeholder="Үйл явдлын төрөл"
                  width={'90%'}
                  borderRadius={20}
                  marginTop={5}
                  style={{height: 40}}
                  onValueChange={setEventType}>
                  <Select.Item label="Үсний найр" value="1"></Select.Item>
                  <Select.Item label="Төрсөн өдөр" value="2"></Select.Item>
                  <Select.Item label="10 Жилийн уулзалт" value="3" />
                  <Select.Item label="Хурим" value="4"></Select.Item>
                  <Select.Item label="Ургийн баяр" value="5"></Select.Item>
                  <Select.Item label="Үндсэн хуулийн өдөр" value="6" />
                  <Select.Item label="Иргэний нийгмийн өдөр" value="7" />
                  <Select.Item label="Гэгээн Валентины өдөр" value="8" />
                  <Select.Item label="Цагаан сар" value="9"></Select.Item>
                  <Select.Item
                    label="Хэвлэл, мэдээллийн ажилтны өдөр"
                    value="10"
                  />
                  <Select.Item
                    label="Олон улсын эмэгтэйчүүдийн өдөр"
                    value="11"
                  />
                  <Select.Item label="Зэвсэгт хүчний өдөр" value="12" />
                  <Select.Item label="Наурызын баярын өдөр" value="13" />
                  <Select.Item
                    label="Монгол хүн сансарт ниссэний баярын өдөр"
                    value="14"></Select.Item>
                  <Select.Item
                    label="Олон улсын инээдмийн өдөр"
                    value="15"></Select.Item>
                  <Select.Item
                    label="Эрүүл мэндийг хамгаалах өдөр"
                    value="16"></Select.Item>
                  <Select.Item
                    label="Байгаль хамгаалах өдөр"
                    value="17"></Select.Item>
                  <Select.Item label="Усны өдөр" value="18"></Select.Item>
                  <Select.Item
                    label="Бурхан багшийн их дүйчэн өдөр"
                    value="19"></Select.Item>
                  <Select.Item
                    label="Үндэсний их баяр наадам"
                    value="20"></Select.Item>
                  <Select.Item
                    label="Авто тээвэрчдийн өдөр"
                    value="21"></Select.Item>
                  <Select.Item
                    label="Мэдээлэл, харилцаа холбоо, технологийн өдөр"
                    value="22"></Select.Item>
                  <Select.Item
                    label="Төмөр замчдын өдөр"
                    value="23"></Select.Item>
                  <Select.Item
                    label="Эрүүл мэндийн салбарын ажилтны өдөр"
                    value="24"></Select.Item>
                  <Select.Item
                    label="Эрчим хүчний ажилтны өдөр"
                    value="25"></Select.Item>
                  <Select.Item label="Цагдаагийн өдөр" value="26"></Select.Item>
                  <Select.Item
                    label="Залуучуудын өдөр"
                    value="27"></Select.Item>
                  <Select.Item label="Эрдмийн баяр" value="2"></Select.Item>
                  <Select.Item label="Барилгачдын өдөр" value="2"></Select.Item>
                  <Select.Item
                    label="Улс төрийн хэлмэгдэгсдийн дурсгалын өдөр"
                    value="28"
                  />
                  <Select.Item
                    label="Үндэсний татварын ажилтны өдөр"
                    value="29"></Select.Item>
                  <Select.Item
                    label="Хилийн цэргийн өдөр"
                    value="30"></Select.Item>
                  <Select.Item
                    label="Монголын оюутны өдөр"
                    value="31"></Select.Item>
                  <Select.Item
                    label="Монгол улсын нийслэлийн өдөр"
                    value="32"></Select.Item>
                  <Select.Item
                    label="Монгол улс тунхагласны баяр"
                    value="33"></Select.Item>
                  <Select.Item
                    label="Дипломат албаны өдөр"
                    value="34"></Select.Item>
                  <Select.Item label="Шинэ жил" value="35"></Select.Item>
                  <Select.Item label="Багш нарын өдөр" value="36"></Select.Item>
                </Select>
                <TouchableOpacity
                  style={styles.insertPhoto}
                  onPress={() => uploadImage('event')}>
                  <Text style={{height: 30, color: '#70A44E', marginTop: 7}}>
                    Зураг оруулах
                  </Text>
                </TouchableOpacity>

                {loading ? (
                  <ActivityIndicator
                    color={'#70A44E'}
                    style={{marginTop: 30}}
                  />
                ) : (
                  <TouchableOpacity style={styles.addBtn} onPress={InsertEvent}>
                    <Text style={{height: 30, color: '#fff', marginTop: 7}}>
                      Нэмэх
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button style={styles.addEvent} onPress={() => setModalShow(true)}>
            <Icon name="plus" style={styles.postIcon} />
          </Button>
          <List
            data={eventInfo}
            horizontal={true}
            renderItem={function (item) {
              return <CardItem item={item} />;
            }}
          />
        </View>
      </View>
      <View style={styles.events}>
        <List
          data={posts}
          renderItem={function (item) {
            return <BigCardItem item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
};
export default EventBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F6',
    paddingHorizontal: 20,
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: '#70A44E',
    borderWidth: 1,
    borderRadius: 30,
    paddingRight: 90,
    marginTop: 10,
  },
  addPost: {
    position: 'absolute',
    right: 20,
    top: 17,
    zIndex: 1,
    width: 30,
    height: 30,
    backgroundColor: '#70A44E',
  },
  addPost2: {
    position: 'absolute',
    right: 60,
    top: 17,
    zIndex: 1,
    width: 30,
    height: 30,
    backgroundColor: '#70A44E',
  },
  postImage: {
    position: 'absolute',
    right: 60,
    top: 17,
    zIndex: 1,
    width: 30,
    height: 30,
    backgroundColor: '#70A44E',
  },
  story: {
    flexDirection: 'row',
  },
  postButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  function: {
    paddingVertical: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: 120,
    borderRightWidth: 1,
    height: 30,
    borderColor: 'black',
    borderRadius: 0,
  },

  addEvent: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#70A44E',
    borderRadius: 50,
    borderColor: 'black',
  },
  modalContainer: {
    height: setHeight(50),
    width: setWidth(80),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
  },
  close: {
    width: 30,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
  },
  closeIcon: {
    height: 15,
    width: 20,
    fontSize: 20,
    color: '#585858',
    alignSelf: 'center',
  },
  input1: {
    fontSize: 13,
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    borderColor: '#e1e1e1',
    width: '90%',
    height: 40,
    marginTop: 20,
    color: '#585858',
  },
  addBtn: {
    height: 40,
    width: 120,
    marginTop: 20,
    backgroundColor: '#70A44E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  insertPhoto: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: '#70A44E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  postImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  postIcon: {
    height: 15,
    width: 15,
    fontSize: 15,
    color: '#fff',
    alignSelf: 'center',
  },
});
