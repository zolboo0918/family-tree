import {Dimensions} from 'react-native';

export const getWidth = () => {
  return Dimensions.get('window').width;
};

export const getHeight = () => {
  return Dimensions.get('window').height;
};

export const setWidth = number => {
  return (Dimensions.get('window').width * number) / 100;
};

export const setHeight = number => {
  return (Dimensions.get('window').height * number) / 100;
};

export const COLORS = {
  BASE_COLOR: '#684CCC',
  TREE_COLOR: '#75be49',
  TEXT_COLOR: '#585858',
  LINEAR_START: '#EB1A25',
  LINEAR_END: '#C80162',
};

export const URL = 'http://172.20.10.4:3001';
