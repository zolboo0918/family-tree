import axios from 'axios';
import {Center} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import HorizontalListItem from '../../components/HorizontalListItem';
import List from '../../components/List';
import {URL} from '../../constants';
import {loginUserInfo} from '../../screens/Login';

export const SecondRoute = () => {
  const [wife, setWife] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/SearchFamily/4`)
      .then(res => {
        const data = res.data.response.Mother.Mother;
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
