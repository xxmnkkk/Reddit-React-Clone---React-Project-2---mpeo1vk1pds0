import { createSlice } from "@reduxjs/toolkit";

const externalWebsite = createSlice({
    name: "externalWebsite",
    initialState: {

    },
    reducers: {
        navigateToRedditRecap: () => {
            window.open("https://www.reddit.com/recap/me/", "_blank")
        },
        navigateToRedditPremium: () => {
            window.open("https://www.reddit.com/premium", "_blank")
        },
        navigateToRedditAvatar: () => {
            window.open("https://www.reddit.com/avatar", "_blank")
        },
        navigateToRedditAdvertise: () => {
            window.open("https://accounts.reddit.com/adsregister?dest=https%3A%2F%2Fads.reddit.com%2F&referrer=https%3A%2F%2Fads.reddit.com%2F&utm_source=d2x_consumer&utm_name=top_nav_cta", "_blank")
        },
        navigateToRedditHelpCenter: () => {
            window.open("https://support.reddithelp.com/hc/en-us", "_blank")
        },
        navigateToRedditUserAgreement: () => {
            window.open("https://www.redditinc.com/policies/user-agreement", "_blank")
        },
        navigateToRedditPrivacyPolicy: () => {
            window.open("https://www.reddit.com/policies/privacy-policy", "_blank")
        },
        navigateToRedditContentPolicy: () => {
            window.open("https://www.redditinc.com/policies/content-policy", "_blank")
        },
        navigateToRedditCodeOfConduct: () => {
            window.open("https://www.redditinc.com/policies/moderator-guidelines", "_blank")
        },
        navigateToRedditAvatarStore: () => {
            window.open("https://www.reddit.com/avatar/shop" , "_blank")
        },
        navigateToPlayStore: () => {
            window.open("https://play.google.com/store/apps/details?id=com.reddit.frontpage&pli=1" , "_blank")
        },
        navigateToAppStore: () => {
            window.open("https://apps.apple.com/us/app/reddit/id1064216828" , "_blank")
        }
    }
})

export const {
    navigateToRedditRecap,
    navigateToRedditPremium,
    navigateToRedditAvatar,
    navigateToRedditAdvertise,
    navigateToRedditHelpCenter,
    navigateToRedditUserAgreement,
    navigateToRedditPrivacyPolicy,
    navigateToRedditContentPolicy,
    navigateToRedditCodeOfConduct,
    navigateToPlayStore,
    navigateToAppStore
} = externalWebsite.actions

export default externalWebsite.reducer