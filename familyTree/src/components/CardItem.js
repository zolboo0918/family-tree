import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';

const CardItem = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.listImage}>
        <Image
          resizeMode="cover"
          style={styles.listImage}
          source={{uri: props.item.img}}
        />
        <Image
          resizeMode="cover"
          style={styles.profileImg}
          source={{uri: props.item.userProfile}}
        />
      </View>
      <View style={{padding: 5}}>
        <Text style={styles.title}>{props.item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={styles.listText}>{props.item.user}</Text>
          <Text style={styles.listText}>{props.item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    width: 215,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  listImage: {
    // marginTop: 70,
    height: 128,
    width: '100%',
    borderRadius: 10,
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#585858',
  },
  listText: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#a0a0a0',
    paddingLeft: 5,
    paddingBottom: 5,
  },
});
