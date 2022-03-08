import { createStore } from 'redux';
import AuthReducer from './AuthReducer';
import { LOGINSUCCESS } from './AuthReducer';
import storage from './storage';

const createAppStore = () => {
  const store = createStore(
    AuthReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const storageState = storage.getItem('auth');

  if (storageState) {
    store.dispatch({ type: LOGINSUCCESS, payload: storageState.id });
  }

  store.subscribe(() => {
    storage.setItem('auth', store.getState());
  });

  return store;
};

export default createAppStore;
