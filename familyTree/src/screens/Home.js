import axios from 'axios';
import {result, setWith} from 'lodash';
import {AlertDialog, Button, Select, StatusBar, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import BigCardItem from '../components/BigCardItem';
import CardItem from '../components/CardItem';
import List from '../components/List';
import SmallCircleItem from '../components/SmallCircleItem';
import {COLORS, setHeight, setWidth} from '../constants';
import {dataEvent, datafriends, dataPost} from '../testData';
import ImagePicker from 'react-native-image-crop-picker';
import {loginUserInfo} from './Login';
import Icon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const EventBook = () => {
  const [modalShow, setModalShow] = useState(false);
  const [EventType, setEventType] = useState();
  const [EventName, setEventName] = useState();
  const [Description, setDescription] = useState();
  const [eventInfo, setEventInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [picture, setPicture] = useState('');
  const date = new Date();

  useEffect(() => {
    axios.get('http://192.168.193.125:3001/EventBook').then(res => {
      if (res.data.status == 'success') {
        res.data.response.forEach(el => {
          axios
            .get(`http://192.168.193.125:3001/users/${el.base_person_ID}`)
            .then(userResult => {
              setEventInfo(prev => [
                ...prev,
                {...el, ...userResult.data.response[0]},
              ]);
            });
        });
      }
    });
    axios.get('http://192.168.193.125:3001/Posts').then(result => {
      if (result.data.status == 'success') {
        result.data.response.forEach(el => {
          axios
            .get(`http://192.168.193.125:3001/users/${el.base_person_ID}`)
            .then(userResult => {
              setPosts(prev => [
                ...prev,
                {...el, ...userResult.data.response[0]},
              ]);
            });
        });
      }
      // setPosts(result.data.response);
    });
  }, []);

  const InsertEvent = () => {
    axios
      .post('http://192.168.193.125:3001/EventBook', {
        Name: EventName,
        Date: `${date.getFullYear()}-${
          date.getMonth() - 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        base_person_ID: loginUserInfo[0].ID,
        event_type_ID: EventType,
      })
      .then(res => {
        Alert.alert('Event amjilttai nemegdlee');
      })
      .catch(err => Alert.alert('Алдаа', JSON.stringify(err)));
  };
  const InsertPost = () => {
    axios
      .post('http://192.168.193.125:3001/Posts', {
        description: Description,
        created_date: `${date.getFullYear()}-${
          date.getMonth() - 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        updated_date: `${date.getFullYear()}-${
          date.getMonth() - 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        base_person_ID: loginUserInfo[0].ID,
        Picture: picture,
      })
      .then(res => {
        console.log('success', res);
        Alert.alert('Amjilttai postlogdloo');
      })
      .catch(err => Alert.alert('Алдаа', JSON.stringify(err)));
  };
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      setPicture(image.path);
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
            placeholder="Пост Оруулах"></TextInput>
          <Button style={styles.addPost} onPress={InsertPost}>
            <Icon
              name="send"
              style={{
                height: 15,
                width: 15,
                fontSize: 15,
                color: '#fff',
                alignSelf: 'center',
              }}
            />
          </Button>
          <Button style={styles.postImage} onPress={uploadImage}>
            <Icon
              name="image"
              style={{
                height: 15,
                width: 15,
                fontSize: 15,
                color: '#fff',
                alignSelf: 'center',
              }}
            />
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
            style={{
              height: setHeight(70),
              width: setWidth(80),
              backgroundColor: 'green',
            }}>
            <View
              style={{
                height: setHeight(70),
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
              }}>
              <Button
                style={{
                  width: 30,
                  alignSelf: 'flex-end',
                  backgroundColor: '#fff',
                }}
                onPress={() => setModalShow(false)}>
                <EvilIcon
                  name="close-o"
                  style={{
                    height: 15,
                    width: 20,
                    fontSize: 20,
                    color: '#585858',
                    alignSelf: 'center',
                  }}
                />
              </Button>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="Үйл явдлын нэр"
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: '#e1e1e1',
                    width: '90%',
                    height: 50,
                    marginTop: 30,
                  }}
                  value={EventName}
                  onChangeText={setEventName}
                />
                <Select
                  placeholder="Үйл явдлын төрөл"
                  width={'90%'}
                  marginTop={30}
                  borderRadius={20}
                  onValueChange={setEventType}>
                  <Select.Item label="Үсний найр" value="1"></Select.Item>
                  <Select.Item label="Төрсөн өдөр" value="2"></Select.Item>
                </Select>
                <Button
                  height={30}
                  width={100}
                  marginTop={30}
                  bgColor={'#70A44E'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={20}
                  onPress={InsertEvent}>
                  <Text style={{height: 30, color: '#fff', marginTop: 7}}>
                    Нэмэх
                  </Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button style={styles.addEvent} onPress={() => setModalShow(true)}>
            <Icon
              name="plus"
              style={{
                height: 15,
                width: 15,
                fontSize: 15,
                color: '#fff',
                alignSelf: 'center',
              }}
            />
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

// export default function HomeScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       <LinearGradient
//         start={{x: 0.0, y: 0.5}}
//         end={{x: 1, y: 0.5}}
//         style={styles.header}
//         colors={['#9BAEFF', '#FF9BFC']}
//       />
//       <View style={styles.headerInfo}>
//         {/* <View style={styles.imageContainer}>
//           <Image
//             source={{uri: 'https://wallpaperaccess.com/full/2213424.jpg'}}
//             style={styles.profileImage}
//           />
//         </View> */}
//         <Text style={styles.name}>А.Солонго</Text>
//         <Text style={styles.vaccine}>Вакцинд хамрагдсан</Text>
//         {/* <View style={styles.row}>
//           <TouchableOpacity style={styles.rowItem}>
//             <Icon name="user-friends" style={styles.icon} />
//             <Text style={styles.school}>Найз болох</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.rowItem2}>
//             <Icon name="comment" style={styles.icon} />
//             <Text style={styles.school}>Чат</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.rowItem3}>
//             <FeatherIcon name="calendar" style={styles.icon} />
//             <Text style={styles.school}>Үйл явдал нэмэх</Text>
//           </TouchableOpacity>
//         </View> */}
//       </View>
//       {/* <View style={styles.intro}>
//         <Text style={styles.school}>
//           Намайг блоөыабрөда ыблоөралоы өалоы бөлоар лорөалоырбөдлоарылобөр алыо
//           рөал рылбөо ралорбө
//         </Text>
//       </View> */}
//       <View style={styles.detail}>
//         <List
//           title="Дэлгэрэнгүй мэдээлэл"
//           data={data2}
//           horizontal={true}
//           renderItem={function (item) {
//             return <BigCardItem item={item} />;
//           }}
//         />
//       </View>
//       <View style={styles.events}>
//         <List
//           title="Үйл явдлууд"
//           data={dataEvent}
//           renderItem={function (item) {
//             return <ListItem data={datafriends} item={item} />;
//             // return <SmallCircleItem item={item} />;
//           }}
//         />
//       </View>
//     </ScrollView>
//   );
// }

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
});

// import React from 'react';
// import ReactFamilyTree from 'react-family-tree';
// import nodes from './prins.json';
// import nodes2 from './diamant.json';
// import PinchZoomPan from 'pinch-zoom-pan';
// import FamilyNode from './FamilyNode';
// import styles from './App.module.css';
// import useDialog from './useDialog';
// import ContactUsDialog from './ContactUsDialog';
// import Footer from './Footer';

// import './styles.css';

// const myID = '0';
// const WIDTH = 260;
// const HEIGHT = 280;

// export default function App() {
//   const [rootId, setRootId] = React.useState(myID);
//   const [markHolucost, setMarkHolucost] = React.useState(false);
//   const {Dialog, open: openDialog} = useDialog();
//   //const onResetClick = React.useCallback(() => setRootId(myID), []);

//   return (
//     <ContactUsDialog>
//       <div className={styles.root}>
//         <div style={{fontSize: 40, textAlign: 'center'}}>
//           {'משפחת  '} {nodes[0].name}
//           {markHolucost ? ' 7/1942 עד 2/1944' : ' 7/1942'}
//         </div>

//         {rootId !== myID && (
//           <button
//             onClick={() => setRootId(myID)}
//             style={{
//               width: 140,
//               height: 30,
//               transform: `translate(60px,-50px)`,
//               color: 'black',
//               backgroundColor: 'lightgray',
//               fontSize: 20,
//             }}>
//             חזור להתחלה
//           </button>
//         )}

//         <PinchZoomPan
//           captureWheel
//           min={0.2}
//           max={2.5}
//           className={styles.wrapper}
//           key={rootId}>
//           <ReactFamilyTree
//             nodes={nodes}
//             rootId={rootId}
//             width={WIDTH}
//             height={HEIGHT}
//             canvasClassName={styles.tree}
//             renderNode={node => (
//               <FamilyNode
//                 key={node.id}
//                 node={node}
//                 isRoot={node.id === rootId}
//                 onSubClick={setRootId}
//                 openDialog={openDialog}
//                 markHolucost={markHolucost}
//                 style={{
//                   width: WIDTH,
//                   height: HEIGHT,
//                   transform: `translate(${node.left * (WIDTH / 2)}px, ${
//                     node.top * (HEIGHT / 2)
//                   }px)`,
//                 }}
//               />
//             )}
//           />
//         </PinchZoomPan>
//         <Footer
//           nodes={nodes}
//           markHolucost={markHolucost}
//           toggle={() => {
//             setMarkHolucost(m => !m); /*פה להחליף עץ  */
//           }}
//         />
//         <Dialog />
//       </div>
//     </ContactUsDialog>
//   );
// }
