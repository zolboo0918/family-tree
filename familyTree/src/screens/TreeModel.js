import axios from 'axios';
import {Fab} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FamilyTree from '../components/FamilyTree';
import {COLORS, URL} from '../constants';
import {AllTreeData, treedata, TreeData} from '../testData';
import {loginUserInfo} from './Login';
import Header from '../components/Header';
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
export let loginUserInfo1;
export const setLoginUserInfo1 = val => {
  loginUserInfo1 = val;
};
const Tree = () => {
  const [treeData, setTreeData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      axios
        .post(`${URL}/SearchFamily/DrawTree/${loginUserInfo[0].family_ID}`)
        .then(res => {
          setTreeData(res.data.response);
        })
        .catch(err => {
          console.log(`err`, err);
          setTreeData([]);
        });
    }
  }, [isFocused]);

  return (
    <>
      <Header
        leftIcon={'menu'}
        title={'Ургийн мод'}
        onLeftPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <View style={{flex: 1}}>
        <ScrollView style={{backgroundColor: '#F3F5F6'}}>
          <FamilyTree
            title={treeData[0]?.Name}
            pathColor={COLORS.TREE_COLOR}
            siblingGap={10}
            nodeStyle={styles.nodeStyle}
            imageStyle={styles.imageStyle}
            titleStyle={styles.titleStyle}
            data={treeData}
            nodeTitleColor="#585858"
            familyGap={5}
            strokeWidth={1}
            nodeClick={item => {
              setLoginUserInfo1({ID: item.Child_ID});
              navigation.navigate('Profile1');
            }}
            titleColor="#585858"
          />
        </ScrollView>
        <Fab
          height={50}
          width={50}
          marginBottom={100}
          justifyContent={'center'}
          alignItems={'center'}
          bgColor={'#FFAB2E'}
          renderInPortal={false}
          onPress={() => navigation.navigate('AddPeople')}
          icon={<Icon name="plus" size={20} color={'#fff'} />}
        />
      </View>
    </>
  );
};

export default Tree;

const styles = StyleSheet.create({
  nodeStyle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: COLORS.TREE_COLOR,
  },
  imageStyle: {
    width: '50%',
    height: '50%',
    borderRadius: 50,
    resizeMode: 'cover',
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
