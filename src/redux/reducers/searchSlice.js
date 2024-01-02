import { createSlice } from "@reduxjs/toolkit";

const searchState = createSlice({
    name: "searchState",
    initialState: {
        searchedData: [null],
        error: null,
        isFollowing: false
    },
    reducers: {
        handleSearchedData: (state, action) => {
            if (action.payload instanceof Error) {
                state.error = {
                    message: action.payload.message
                };
            } else {
                state.searchedData = action.payload;
                state.error = null;
            }
        },
        setSearchedData: (state, action) => {
            state.searchedData = action.payload
        },
        setFollowing: (state) => {
            state.isFollowing = !state.isFollowing
        }
    },
})

export const { handleSearchedData , setSearchedData , setFollowing} = searchState.actions

export default searchState.reducer