import axios from 'axios';
import {isEmpty} from 'lodash';
import {Center} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import HorizontalListItem from '../../components/HorizontalListItem';
import List from '../../components/List';
import {URL} from '../../constants';
import {loginUserInfo, type} from '../../screens/Login';
import {loginUserInfo1} from '../../screens/TreeModel';

export const SecondRoute = () => {
  const [wife, setWife] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (type == 2) {
        axios
          .get(`${URL}/SearchFamily/${loginUserInfo1.ID}`)
          .then(res => {
            if (!isEmpty(res.data.response.Mother)) {
              const data = res.data.response.Mother.Mother;
              const arr = [{name: data}];
              setWife(arr);
            }
          })
          .catch(err => console.log('err :>> ', err));
      } else {
        axios
          .get(`${URL}/SearchFamily/${loginUserInfo[0].ID}`)
          .then(res => {
            const data = res.data.response.Mother.Mother;
            const arr = [{name: data}];
            setWife(arr);
          })
          .catch(err => console.log('err :>> ', err));
      }
    });
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
