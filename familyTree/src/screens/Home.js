import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import BigCardItem from '../components/BigCardItem';
import CardItem from '../components/CardItem';
import List from '../components/List';
import SmallCircleItem from '../components/SmallCircleItem';
import {COLORS} from '../constants';
import {dataEvent, datafriends, dataPost} from '../testData';

export default function HomeScreen() {
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
      <View style={styles.events}>
        <List
          data={dataEvent}
          horizontal={true}
          renderItem={function (item) {
            return <CardItem item={item} />;
          }}
        />
      </View>
      <View style={styles.events}>
        <List
          data={dataPost}
          renderItem={function (item) {
            return <BigCardItem item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
}

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
