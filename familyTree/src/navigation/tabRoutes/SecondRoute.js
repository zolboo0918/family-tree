import axios from 'axios';
import {Center} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import HorizontalListItem from '../../components/HorizontalListItem';
import List from '../../components/List';
import {loginUserInfo} from '../../screens/Login';

export const SecondRoute = () => {
  const [wife, setWife] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.193.116:3001/SearchFamily/${loginUserInfo[0]}`)
      .then(res => {
        const data = res.data.response.Mother;
        const arr = [{name: data}];
        console.log(`arr`, arr);
        setWife(arr);
      })
      .catch(err => console.log('err :>> ', err));
  }, []);

  return (
    <Center flex={1} bgColor="#F3F5F6">
      <List
        data={wife}
        style={{marginTop: -10}}
        renderItem={function (item) {
          return <HorizontalListItem item={item} />;
        }}
      />
    </Center>
  );
};
