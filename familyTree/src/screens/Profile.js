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
import FIcon from 'react-native-vector-icons/Feather';
import CardItem from '../components/CardItem';
import List from '../components/List';
import SmallCircleItem from '../components/SmallCircleItem';
import {COLORS} from '../constants';
import {data, datafriends} from '../testData';

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        start={{x: 0.0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.header}
        colors={['#9BAEFF', '#FF9BFC']}></LinearGradient>
      <View style={styles.headerInfo}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: 'https://wallpaperaccess.com/full/2213424.jpg'}}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>А.Солонго</Text>
        <Text style={styles.school}>Монгол улсын их сургууль</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowItem}>
            <Icon name="clock" style={styles.icon} />
            <Text style={styles.school}>5 мин</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowItem2}>
            <Icon name="comment" style={styles.icon} />
            <Text style={styles.school}>Чат</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowItem3}>
            <FIcon name="more-horizontal" style={styles.icon} />
            <Text style={styles.school}>Дэлгэрэнгүй</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.intro}>
        <Text style={styles.school}>
          Намайг Солонго гэдэг. 22 настай МУИС-д сурдаг.{' '}
        </Text>
      </View>
      <View style={styles.detail}>
        <List
          horizontal={true}
          title="Дэлгэрэнгүй мэдээлэл"
          data={data}
          renderItem={function (item) {
            return <CardItem item={item} />;
          }}
        />
      </View>
      <View style={styles.detail}>
        <List
          horizontal={true}
          title="Найзууд"
          data={datafriends}
          renderItem={function (item) {
            return <SmallCircleItem item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

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
    backgroundColor: '#fff',
    width: '80%',
    height: 200,
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
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
    marginTop: 10,
    fontSize: 18,
    color: COLORS.TEXT_COLOR,
    fontWeight: 'bold',
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
    marginTop: 120,
    marginHorizontal: '10%',
  },
  detail: {
    marginTop: 20,
    marginHorizontal: '10%',
  },
});
