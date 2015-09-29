import { createStore } from 'redux';
import userReducer from '../reducers/user';

let userStore = createStore(userReducer);

export default userStore;