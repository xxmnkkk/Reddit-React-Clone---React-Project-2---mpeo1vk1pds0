import { createSlice } from "@reduxjs/toolkit";

const searchedUserState = createSlice({
    name: "searchedUserState",
    initialState: {
        searchedUserData: []
    },
    reducers: {
        
    },
})

export const {  } = searchedUserState.actions

export default searchedUserState.reducer