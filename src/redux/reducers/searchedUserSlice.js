import { createSlice } from "@reduxjs/toolkit";

const searchedUserState = createSlice({
    name: "searchedUserState",
    initialState: {
        searchedUserData: [],
        subredditUserId: "",
        subredditData: [],
        subredditUserData: []
    },
    reducers: {
        setSubredditUserId: (state, action) => {
            state.subredditUserId = action.payload
        },
        setSubredditData: (state, action) => {
            state.subredditData = action.payload
        },
        setSubredditUserData: (state, action) => {
            state.subredditUserData = action.payload
        },
    },
})

export const {
    setSubredditUserId,
    setSubredditData,
    setSubredditUserData
} = searchedUserState.actions

export default searchedUserState.reducer