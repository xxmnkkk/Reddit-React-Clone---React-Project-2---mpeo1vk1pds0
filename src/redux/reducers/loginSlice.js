import { createSlice } from '@reduxjs/toolkit';

export const handleLoginAndSignup = createSlice({
  name: "loginState",
  initialState: {
    isLoggedIn: false,
    isLoginModalVisible: false,
    isProfileModalVisible: false,
    showSearchModal: false,
    isActiveForm: "login",
    name: "",
    email: "",
    password: "",
    isMessagesActive: false,
    isNotificationActive: false,
    isGetAppActive: false,
    isMenuActive: false,
    onlineStatus: false,
    isCreateCommunityActive: false,
    showIpadMenu: false,
    isLightModeActive: false,
    currentLocation: ""
  },
  reducers: {
    handleLoginButtonClick: (state) => {
      state.isLoginModalVisible = !state.isLoginModalVisible
    },
    handleLoginModalCloseClick: (state) => {
      state.isLoginModalVisible = !state.isLoginModalVisible
      state.isActiveForm = "login"
    },
    handleFormChangeClick: (state) => {
      if (state.isActiveForm === "login") {
        state.isActiveForm = "signup"
        state.name = ""
        state.email = ""
        state.password = ""
      }
      else if (state.isActiveForm === "signup") {
        state.isActiveForm = "login"
        state.email = ""
        state.password = ""
      }
    },
    handleLoginInput: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },
    handleSignupInput: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },
    handleUserInput: (state, action) => {
      console.log(action.payload);
      state.email = action.payload.email
      state.password = action.payload.password
    },
    handleIsLoggedIn: (state) => {
      state.isLoggedIn = true
    },
    handleProfileModal: (state) => {
      state.isProfileModalVisible = !state.isProfileModalVisible
    },
    handleSearchModal: (state) => {
      state.showSearchModal = !state.showSearchModal
    },
    handleMessagesClick: (state) => {
      state.isMessagesActive = !state.isMessagesActive
    },
    handleLogOut: (state) => {
      state.isLoggedIn = false
    },
    handleIsNotificationActive: (state) => {
      state.isNotificationActive = !state.isNotificationActive
    },
    handleGetAppClick: (state) => {
      state.isGetAppActive = !state.isGetAppActive
    },
    handleIsMenuActive: (state) => {
      state.isMenuActive = !state.isMenuActive
    },
    handleOnlineStatusClick: (state) => {
      state.onlineStatus = !state.onlineStatus
    },
    handleCreateCommunityClick: (state) => {
      state.isCreateCommunityActive = !state.isCreateCommunityActive
    },
    handleIpadMenuClick: (state) => {
      state.showIpadMenu = !state.showIpadMenu
    },
    handleLightModeActive: (state) => {
      state.isLightModeActive = !state.isLightModeActive
    },
    setCurrentLocation: (state , action) => {
      state.currentLocation = action.payload
    }
  }
});

export const {
  handleLoginButtonClick,
  handleLoginModalCloseClick,
  handleFormChangeClick,
  handleLoginInput,
  handleSignupInput,
  handleIsLoggedIn,
  handleProfileModal,
  handleUserInput,
  handleSearchModal,
  handleMessagesClick,
  handleLogOut,
  handleIsNotificationActive,
  handleGetAppClick,
  handleIsMenuActive,
  handleOnlineStatusClick,
  handleCreateCommunityClick,
  handleIpadMenuClick,
  handleLightModeActive,
  setCurrentLocation
} = handleLoginAndSignup.actions;

export default handleLoginAndSignup.reducer;
