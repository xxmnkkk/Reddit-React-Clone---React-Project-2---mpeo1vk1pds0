import { configureStore } from '@reduxjs/toolkit';
import headerCounter from './reducers/headerSlice'

export default configureStore({
  reducer: {
    counter: headerCounter,
  },
});