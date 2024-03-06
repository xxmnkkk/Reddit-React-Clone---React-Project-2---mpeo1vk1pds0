import HomePageSideNavBar from "./Ui/HomePageSideNavBar"
import "./styles/homePage.scss"
import React from 'react'
import PopularCommunities from "./Ui/PopularCommunities"
import HomePagePosts from "./Ui/HomePagePosts"

import { useSelector, useDispatch } from "react-redux"


export default function HomePage() {
    // Here im managing my homepage layout, basicilly applying css to alight it equally and importing the required component
    const homepageState = useSelector((state) => state.homePageState)
    const loginState = useSelector((state) => state.loginState)
    return (
        <>
            <div className={`homepage-main-container ${loginState.isLightModeActive && "homepage-main-container-light"}`}>
                {!loginState.isLoggedIn && <div className="home-sidenavbar">
                    <HomePageSideNavBar />
                </div>}

                <div className={`homepage-posts-container homepage-posts-container-ipad ${loginState.isLightModeActive && "homepage-posts-container-light"}`}>
                    <HomePagePosts />
                </div>

                <PopularCommunities />
            </div>
        </>
    )
}
