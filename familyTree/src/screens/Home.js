import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import BigCardItem from '../components/BigCardItem';
import List from '../components/List';
import SmallCircleItem from '../components/SmallCircleItem';
import {COLORS} from '../constants';
import {data2, dataEvent, datafriends} from '../testData';
import {data} from '../testData';
import ListItem from '../components/ListItem';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        start={{x: 0.0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.header}
        colors={['#9BAEFF', '#FF9BFC']}
      />
      <View style={styles.headerInfo}>
        {/* <View style={styles.imageContainer}>
          <Image
            source={{uri: 'https://wallpaperaccess.com/full/2213424.jpg'}}
            style={styles.profileImage}
          />
        </View> */}
        <Text style={styles.name}>А.Солонго</Text>
        <Text style={styles.vaccine}>Вакцинд хамрагдсан</Text>
        {/* <View style={styles.row}>
          <TouchableOpacity style={styles.rowItem}>
            <Icon name="user-friends" style={styles.icon} />
            <Text style={styles.school}>Найз болох</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowItem2}>
            <Icon name="comment" style={styles.icon} />
            <Text style={styles.school}>Чат</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowItem3}>
            <FeatherIcon name="calendar" style={styles.icon} />
            <Text style={styles.school}>Үйл явдал нэмэх</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {/* <View style={styles.intro}>
        <Text style={styles.school}>
          Намайг блоөыабрөда ыблоөралоы өалоы бөлоар лорөалоырбөдлоарылобөр алыо
          рөал рылбөо ралорбө
        </Text>
      </View> */}
      <View style={styles.detail}>
        <List
          title="Дэлгэрэнгүй мэдээлэл"
          data={data2}
          horizontal={true}
          renderItem={function (item) {
            return <BigCardItem item={item} />;
          }}
        />
      </View>
      <View style={styles.events}>
        <List
          title="Үйл явдлууд"
          data={dataEvent}
          renderItem={function (item) {
            return <ListItem data={datafriends} item={item} />;
            // return <SmallCircleItem item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  events: {
    marginTop: 20,
    marginHorizontal: '10%',
  },
});
