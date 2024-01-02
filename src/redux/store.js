import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './reducers/loginSlice';
import feedSelectorSlice from './reducers/feedSelectorSlice';
import externalWebsiteSlice from './reducers/externalWebsiteSlice';
import homePageSlice from './reducers/homePageSlice';
import searchSlice from './reducers/searchSlice';
import searchedUserSlice from './reducers/searchedUserSlice';

export default configureStore({
  reducer: {
    feedSelectorState: feedSelectorSlice,
    loginState: loginSlice,
    externalWebsiteState: externalWebsiteSlice,
    homePageState: homePageSlice,
    searchState: searchSlice,
    searchedUserState: searchedUserSlice
  },
});