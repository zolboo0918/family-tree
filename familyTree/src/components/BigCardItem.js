import Icon from 'react-native-vector-icons/Fontisto';
import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';

const BigCardItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity>
          <Image
            resizeMode="cover"
            style={styles.profileImg}
            source={{uri: props.item.userProfile}}
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.userName}>{props.item.user}</Text>
          <Text style={styles.description}>{props.item.description}</Text>
        </View>
      </View>
      <Image
        resizeMode="cover"
        style={styles.listImage}
        source={{uri: props.item.img}}
      />
      <View style={styles.bottom}>
        <View style={styles.bottomItem}>
          <Icon name="heart-alt" style={styles.icon} />
          <Text style={styles.bottomItemText}>{props.item.likeCount}</Text>
        </View>
        <View style={styles.bottomItem}>
          <Icon name="comment" style={styles.icon} />
          <Text style={styles.bottomItemText}>{props.item.commentCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default BigCardItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  description: {
    fontSize: 13,
    color: '#a0a0a0',
  },
  listImage: {
    marginTop: 10,
    height: 220,
    width: '95%',
    borderRadius: 15,
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  bottomItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  bottomItemText: {
    fontSize: 16,
  },
  listText: {
    alignSelf: 'flex-start',
    fontSize: 12,
    paddingLeft: 5,
    paddingBottom: 5,
  },
});
