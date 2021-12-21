import axios from 'axios';
import {result} from 'lodash';
import {Button, Select, StatusBar, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import BigCardItem from '../components/BigCardItem';
import CardItem from '../components/CardItem';
import List from '../components/List';
import SmallCircleItem from '../components/SmallCircleItem';
import {COLORS} from '../constants';
import {dataEvent, datafriends, dataPost} from '../testData';
import ImagePicker from 'react-native-image-crop-picker';
import {loginUserInfo} from './Login';

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
      });
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
      });
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
        <TextInput
          style={styles.container1}
          value={Description}
          onChangeText={val => setDescription(val)}
          placeholder="Пост Оруулах"></TextInput>
        <View style={styles.function}>
          <Button style={styles.function} onPress={InsertPost}>
            Пост Бичих
          </Button>
          <Button style={styles.function} onPress={uploadImage}>
            Зураг Оруулах
          </Button>
        </View>
      </View>
      <View style={styles.events}>
        <View>
          <Button style={styles.function1} onPress={() => setModalShow(true)} />
          <Modal visible={modalShow}>
            <Button onPress={() => setModalShow(false)} />
            <View
              style={{
                height: 100,
                width: '90%',
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text>Овгийн Нэр</Text>
              <TextInput
                style={{
                  width: '90%',
                  height: 50,
                  backgroundColor: 'green',
                  marginTop: 600,
                }}
                value={EventName}
                onChangeText={setEventName}
              />
              <Text>Хэзээ Үүссэн?</Text>

              <Select onValueChange={setEventType}>
                <Select.Item label="Үсний найр" value="1"></Select.Item>
                <Select.Item label="Төрсөн өдөр" value="2"></Select.Item>
                <Select.Item label="" value="1"></Select.Item>
                <Select.Item label="Үсний найр" value="1"></Select.Item>
                <Select.Item label="Үсний найр" value="1"></Select.Item>
                <Select.Item label="Үсний найр" value="1"></Select.Item>
                <Select.Item label="Үсний найр" value="1"></Select.Item>
                <Select.Item label="Үсний найр" value="1"></Select.Item>
              </Select>
              <Button height={30} width={100} onPress={InsertEvent} />
            </View>
          </Modal>
        </View>
        <List
          data={eventInfo}
          horizontal={true}
          renderItem={function (item) {
            return <CardItem item={item} />;
          }}
        />
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
    borderColor: '#4267B2',
    borderWidth: 3,
    borderRadius: 20,
  },
  story: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: 'yellow',
    height: 200,
  },
  headerInfo: {
    backgroundColor: '#d1e7ff',
    width: '80%',
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
    top: 150,
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  imageContainer: {
    borderRadius: 50,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 25,
  },
  profileImage: {
    borderRadius: 50,
    height: 80,
    width: 80,
  },
  name: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 14,
    color: COLORS.TEXT_COLOR,
    fontWeight: 'bold',
  },
  vaccine: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontSize: 20,
    color: COLORS.TEXT_COLOR,
    fontWeight: 'bold',
    marginTop: 15,
  },
  school: {
    fontSize: 12,
    color: COLORS.TEXT_COLOR,
    fontWeight: 'bold',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  rowItem: {
    width: '33.3%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderBottomLeftRadius: 10,
  },
  rowItem2: {
    width: '33.3%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  rowItem3: {
    width: '33.3%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderBottomRightRadius: 10,
  },
  icon: {
    fontSize: 18,
  },
  intro: {
    marginTop: 60,
    marginHorizontal: '10%',
  },
  detail: {
    marginTop: 70,
    marginHorizontal: '10%',
  },
  events: {},

  function: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: 120,
    height: 55,
    borderColor: 'black',
  },

  function1: {
    flexDirection: 'row',
    width: 120,
    height: 60,
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
