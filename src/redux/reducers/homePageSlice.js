import { createSlice } from "@reduxjs/toolkit";

const homePageState = createSlice({
    name: "homepageState",
    initialState: {
        selectedFeed: "home",
        isTopicsActive: false,
        isResourcesActive: false,
        isPopularPostActive: false,
        popularCommunitiesData: [],
        isShowMoreActive: false,
        homePagePostsData: [],
        isPostMenuActive: false,
        activePostIndex: null,
        sortedPostData:[],
        isCommentActive: false,
        comments: [],
        myComment: ""
    },
    reducers: {
        setSelectedFeed: (state , action) => {
            state.selectedFeed = action.payload
        },
        setIsTopicsActive: (state) => {
            state.isTopicsActive = !state.isTopicsActive
        },
        setIsResourcesActive: (state) => {
            state.isResourcesActive = !state.isResourcesActive
        },
        setIsPopularPostActive: (state) => {
            state.isPopularPostActive = !state.isPopularPostActive
        },
        setPopularCommunnitiesData: (state , action) => {
            state.popularCommunitiesData = action.payload
        },
        handleShowMoreClick: (state) => {
            state.isShowMoreActive = !state.isShowMoreActive
        },
        setHomePagePostsData: (state , action) => {
            state.homePagePostsData = action.payload
        },
        setIsPostMenuActive: (state , action) => {
            state.isPostMenuActive = !state.isPostMenuActive;
        },
        setActivePostIndex: (state , action) => {
            state.activePostIndex = action.payload
        },
        handleSortByLikeCount: (state) => {
            const sortedData = [...state.homePagePostsData];
            sortedData.sort((a, b) => b.likeCount - a.likeCount);
            state.sortedPostData = sortedData
        },
        handleCommentModal: (state) => {
            state.isCommentActive = !state.isCommentActive
        },
        setComments: (state , action) => {
            state.comments = action.payload
        },
        updateComments: (state , action) => {
            state.myComment = action.payload
        }
    }
})

export const {
    setSelectedFeed,
    setIsTopicsActive,
    setIsResourcesActive,
    setIsPopularPostActive,
    setPopularCommunnitiesData,
    handleShowMoreClick,
    setHomePagePostsData,
    setIsPostMenuActive,
    setActivePostIndex,
    handleCommentModal,
    setComments,
    updateComments
} = homePageState.actions

export default homePageState.reducer