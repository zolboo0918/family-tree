import {Center} from 'native-base';
import React from 'react';
import HorizontalListItem from '../../components/HorizontalListItem';
import List from '../../components/List';
import {dataProfileFamily} from '../../testData';

export default function FirstRoute() {
  return (
    <Center flex={1} bgColor="#F3F5F6">
      <List
        data={dataProfileFamily}
        style={{marginTop: -10}}
        renderItem={function (item) {
          return <HorizontalListItem item={item} />;
        }}
      />
    </Center>
  );
}
