import { createSlice } from '@reduxjs/toolkit'

export const feedSelectorState = createSlice({
    name: "feedSelector",
    initialState: {
        index: 0,
        selectedFeed: "Home",
        isFeedModalVisible: false
    },
    reducers: {
        setIndex: (state , action) => {
            state.index = action.payload;
        },
        setSelectedFeed1: (state , action) => {
            state.selectedFeed = action.payload;
            state.isFeedModalVisible = false
        },
        setFeedModal: (state) => {
            state.isFeedModalVisible = !state.isFeedModalVisible
        }
    }
})

export const {setIndex , setSelectedFeed1 , setFeedModal} = feedSelectorState.actions
export default feedSelectorState.reducer