import axios from 'axios';
import {getToken} from './authSlice';

const authMiddleware =
  ({dispatch}) =>
  next =>
  action => {
    const token = getToken(); // get the authentication token from the state

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return next(action);
  };

export default authMiddleware;
