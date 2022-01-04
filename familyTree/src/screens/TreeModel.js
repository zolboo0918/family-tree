import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FamilyTree from '../components/FamilyTree';
import {COLORS} from '../constants';
import {AllTreeData, treedata, TreeData} from '../testData';

const Tree = () => {
  const [treeData, setTreeData] = useState(treeData);
  useEffect(() => {
    axios
      .get('http://192.168.193.116:3001/SearchFamily/Urgiin/2')
      .then(res => {
        setTreeData(res.data.response);
      })
      .catch(err => {
        setTreeData(treedata);
      });
  }, []);
  console.log(`treeData`, treeData);
  return (
    <ScrollView style={{backgroundColor: '#F3F5F6'}}>
      <FamilyTree
        title="Тангууд"
        pathColor={COLORS.TREE_COLOR}
        siblingGap={10}
        nodeStyle={styles.nodeStyle}
        imageStyle={styles.imageStyle}
        titleStyle={styles.titleStyle}
        data={treeData}
        nodeTitleColor="#585858"
        familyGap={5}
        strokeWidth={1}
        titleColor="#585858"
      />
    </ScrollView>
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
