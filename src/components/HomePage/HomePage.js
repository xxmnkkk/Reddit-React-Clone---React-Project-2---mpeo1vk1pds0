import HomePageSideNavBar from "./Ui/HomePageSideNavBar"
import "./styles/homePage.scss"
import React from 'react'
import PopularCommunities from "./Ui/PopularCommunities"
import HomePagePosts from "./Ui/HomePagePosts"

import { useSelector, useDispatch } from "react-redux"


export default function HomePage() {
    const homepageState = useSelector((state) => state.homePageState)
    const loginState = useSelector((state) => state.loginState)
    return (
        <>
            <div className="homepage-main-container">
                {!loginState.isLoggedIn && <HomePageSideNavBar className="home-sidenavbar" />}

                <div className="homepage-posts-container">
                    <HomePagePosts />
                </div>

                <PopularCommunities />
            </div>
        </>
    )
}
