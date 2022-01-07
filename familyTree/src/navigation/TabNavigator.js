import * as React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {COLORS} from '../constants';
import {FifthRoute} from './tabRoutes/FifthRoute';
import FirstRoute from './tabRoutes/FirstRoute';
import {FourthRoute} from './tabRoutes/FourthRoute';
import {SecondRoute} from './tabRoutes/SecondRoute';
import {ThirdRoute} from './tabRoutes/ThirdRoute';

const initialLayout = {width: Dimensions.get('window').width};

export default function TabViewExample(props) {
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Үр хүүхэд'},
    {key: 'second', title: 'Хань'},
    {key: 'third', title: 'Профайл'},
    {key: 'fourth', title: 'Пост'},
    {key: 'fifth', title: 'Альбом'},
  ]);

  const renderTabBar = props => {
    return (
      <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
        {props.navigationState.routes.map((route, i) => {
          const borderBottomColor = index === i ? COLORS.TREE_COLOR : '#fff';
          return (
            <TouchableOpacity
              onPress={() => setIndex(i)}
              style={[styles.tabItem, {borderBottomColor}]}>
              <Text>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{marginTop: StatusBar.currentHeight, marginHorizontal: -20}}
    />
  );
}
const styles = StyleSheet.create({
  tabItem: {
    height: 35,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
  },
});
