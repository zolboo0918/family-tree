import axios from 'axios';
import {Center} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import HorizontalListItem from '../../components/HorizontalListItem';
import List from '../../components/List';
import {URL} from '../../constants';
import {ProfileContext} from '../../context/ProfileContext';
import {dataProfileFamily} from '../../testData';

export default function FirstRoute() {
  const [children, setChildren] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}/SearchFamily/4`)
      .then(res => {
        // setFather(res.data.response.father);
        // setWife(res.data.response.wife);
        setChildren(res.data.response.children);
        // setFamily(res.data.response.family);
      })
      .catch(err => console.log('err :>> ', err));
  }, []);

  return (
    <Center flex={1} bgColor="#F3F5F6">
      <List
        data={children}
        style={{marginTop: -10}}
        renderItem={function (item) {
          return <HorizontalListItem item={item} />;
        }}
      />
    </Center>
  );
}
