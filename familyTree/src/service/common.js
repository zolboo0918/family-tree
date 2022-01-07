import axios from 'axios';
import {URL} from '../constants';

export const getBasePerson = id => {
  return axios.get(`${URL}/users/${id}`).then(userResult => {
    return userResult.data.response[0];
  });
};
