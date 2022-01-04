import axios from 'axios';
import {Center} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import HorizontalListItem from '../../components/HorizontalListItem';
import List from '../../components/List';

export const SecondRoute = () => {
  const [wife, setWife] = useState([]);
  useEffect(() => {
    axios
      .get('http://192.168.0.105:3001/SearchFamily/4')
      .then(res => {
        const data = res.data.response.wife;
        const arr = [{name: data.wife}];
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
