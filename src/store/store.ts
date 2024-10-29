
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import userReducer from './userSlice';
import wardReducer from './wardSlice';
const store = configureStore({
  reducer: {
   auth:authReducer,
   user:userReducer,
   ward:wardReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
