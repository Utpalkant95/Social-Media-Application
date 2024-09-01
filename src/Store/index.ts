import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
//  import the filterSLice
import filterReducer from './filterSlice';
import checkout from './checkoutSlice';

const reducers = combineReducers({
  user: userReducer,
  filter: filterReducer,
  checkout : checkout
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [ "user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

   

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};