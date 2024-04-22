import "./Styles/NavBar.scss"
import React, { useEffect, useRef, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
    handleProfileModal,
    handleLoginButtonClick,
    handleMessagesClick,
    handleLogOut,
    handleIsNotificationActive,
    handleGetAppClick,
    handleIsMenuActive,
    handleOnlineStatusClick,
    handleIpadMenuClick,
    handleLightModeActive,
    handleCreateCommunityClick
} from "../../redux/reducers/loginSlice";

import {
    navigateToRedditRecap,
    navigateToRedditPremium,
    navigateToRedditAvatar,
    navigateToRedditAdvertise,
    navigateToRedditHelpCenter,
    navigateToRedditUserAgreement,
    navigateToRedditPrivacyPolicy,
    navigateToRedditContentPolicy,
    navigateToRedditCodeOfConduct
} from "../../redux/reducers/externalWebsiteSlice.js"

import { handleSearchInput } from "../../redux/reducers/searchSlice"
import SigninAndSignupModal from "./Ui/SigninAndSignupModal";
import LoggedInFeedSelector from "./Ui/LoggedInFeedSelector";
import Search from "./Ui/Search";
import Chat from "./Ui/Chat.js";
import Notification from "./Ui/Notification.js";
import Switch from '@mui/material/Switch';
import { setSelectedFeed } from "../../redux/reducers/homePageSlice";
import { setIndex, setFeedModal } from "../../redux/reducers/feedSelectorSlice";

import RedditLogo from '../../Assets/images/1658834095reddit-logo-png.png'
import userDummyImage from "../../Assets/images/userDummyImage.png"

import { IoEyeSharp } from "react-icons/io5";
import { CgCommunity } from "react-icons/cg";
import { TbPremiumRights } from "react-icons/tb";
import { TbHelpCircle } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import { GiFlowerEmblem } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { CiBullhorn } from "react-icons/ci";
import { IoAdd, IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { CgArrowTopRightO } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci"
import { BsQrCodeScan } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { GiBananaPeeled } from "react-icons/gi";

import GetApp from "./Ui/GetApp.js";
import Menu from "./Ui/Menu.js";
import CreateCommunity from "./Ui/CreateCommunity.js";
import { useNavigate } from "react-router-dom";
import HomePageSideNavBar from "../HomePage/Ui/HomePageSideNavBar.js";


export default function NavBar() {
    const loginState = useSelector((state) => state.loginState);
    const externalWebsiteState = useSelector((state) => state.externalWebsiteState);
    const feedSelectorState = useSelector((state) => state.feedSelectorState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Getting the logged in users name so that i can display it inside user profile tab.
    const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));

    // const token = sessionStorage.getItem("token")


    // Here im handling logout click. So basically im closing the profile modal from which the user is able to log out and along with that im checking if message/feedSelectorModal is active, if it is im setting it to false. Also im removing the token and logged in users detail from the session storage.
    const handleLogout = () => {
        dispatch(handleLogOut())
        dispatch(handleProfileModal())

        if (loginState.isMessagesActive) {
            dispatch(handleMessagesClick())
        }

        if (feedSelectorState.isFeedModalVisible) {
            dispatch(setFeedModal())
        }

        sessionStorage.removeItem("token")
        sessionStorage.removeItem("LoggedInUser")
    }

    return (
        <>
            {/* This is the code for my Navigation bar */}
            <div className={`navbar-container ${loginState.isLightModeActive && "navbar-container-light"}`}>
                <div className='navbar-logo-container' onClick={() => navigate('/')}>

                    {/* Here im checking if the user is logged in and if he is not im going to display the required divs which should only be visible when the user is logged in */}
                    {!loginState.isLoggedIn &&
                        <div className={`ipad-menu-icon-section ${loginState.isLightModeActive && "ipad-menu-icon-section-light"}`}>
                            <div
                                className="ipad-menu-icon-container"
                                onClick={() => dispatch(handleIpadMenuClick())}
                            >
                                <IoMdMenu className={`ipad-menu-icon ${loginState.isLightModeActive && "ipad-menu-icon-light"}`} />
                            </div>

                            {
                                loginState.showIpadMenu &&
                                <div
                                    className="ipad-menu-modal-layover"
                                    onClick={() => dispatch(handleIpadMenuClick())}
                                >
                                    <div className={`ipad-menu-modal ${loginState.isLightModeActive && "ipad-menu-modal-light"}`}>
                                        <HomePageSideNavBar />
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    <img src={RedditLogo} />
                    <span>reddit</span>
                </div>

                {/* Here im checking if the user is logged in and if he is then im displaying the logged in feed selectior. this is basically a side nav bar but just for the case when the user is logged in */}
                {loginState.isLoggedIn &&
                    <LoggedInFeedSelector />
                }

                {/* Imorting the search component */}
                <Search />

                {/* Here im displaying all of the icons like popular, reddit recap, message, notification, create post, advertise and the user profile icons*/}
                <div className="navbar-signin-container">
                    {loginState.isLoggedIn &&
                        <div
                            className="navbar-auth-logo-container"
                            onClick={() => {
                                if(loginState.currentLocation !== "/"){
                                    navigate("/")
                                    dispatch(setSelectedFeed("popular"));
                                    dispatch(setIndex(1));
                                }else{
                                    dispatch(setSelectedFeed("popular"));
                                    dispatch(setIndex(1));
                                }
                            }}
                        >
                            <CgArrowTopRightO className="navbar-auth-logo" />
                        </div>
                    }
                    <div className="navbar-banana-logo-container" onClick={() => dispatch(navigateToRedditRecap())}>
                        <GiBananaPeeled className="navbar-banana-logo" />
                    </div>

                    {loginState.isLoggedIn &&
                        <>
                            <div
                                className="navbar-auth-logo-container"
                                onClick={() => dispatch(handleMessagesClick())}
                            >
                                <AiOutlineMessage className="navbar-auth-logo" />
                            </div>

                            <div
                                className="navbar-auth-logo-container"
                                onClick={() => dispatch(handleIsNotificationActive())}
                            >
                                <IoNotificationsOutline className="navbar-auth-logo" />
                                {loginState.isNotificationActive &&
                                    <Notification />
                                }
                            </div>

                            <div
                                className="navbar-auth-logo-container"
                                onClick={() => navigate("/createpost")}
                            >
                                <IoAdd className="navbar-auth-logo" />
                            </div>

                            <div
                                className="navbar-auth-hornlogo-container"
                                onClick={() => dispatch(navigateToRedditAdvertise())}
                            >
                                <CiBullhorn className="navbar-auth-hornlogo" />
                            </div>
                        </>
                    }

                    <p className="navbar-divider"></p>
                    {!loginState.isLoggedIn &&
                        <>
                            <div
                                className="navbar-getapp-container"
                                onClick={() => dispatch(handleGetAppClick())}
                            >
                                <BsQrCodeScan className="navbar-qr-code" />
                                <span>Get app</span>
                            </div>
                            <div
                                className="navbar-signin-button"
                                onClick={() => dispatch(handleLoginButtonClick())}
                            >
                                Log In
                            </div>
                            <div
                                className="navbar-horizontal-kabab"
                                onClick={() => dispatch(handleIsMenuActive())}

                            >
                                <CiMenuKebab className="navbar-kabab" />
                            </div>
                        </>
                    }

                    {/* This is the code for the user profile container. this basically shows a default picture and name and a dropdown icon */}
                    {loginState.isLoggedIn &&
                        <div className={`loggedin-user-profile-container ${loginState.isProfileModalVisible && "loggedin-profile-modal-active"}`}>
                            <div
                                className="loggedin-user-info"
                                onClick={() => dispatch(handleProfileModal())}
                            >
                                <div className="profile-image-div">
                                    <img src={userDummyImage} />
                                    {loginState.onlineStatus && <div className="user-active-green-dot"></div>}
                                </div>
                                <div>
                                    <p>{loggedInUser?.name}</p>
                                    <div>
                                        <GiFlowerEmblem className="karma-flower-icon" />
                                        1 karma
                                    </div>
                                </div>
                                <RiArrowDropDownLine className="loggedin-user-dowpdown" />
                            </div>

                            {/* This code is for when the user profile dropdown is clicked. When it is clicked a lot of list is shown some of which is going to redirect me to another page and some of it is going to load up components */}
                            {loginState.isProfileModalVisible &&
                                <div className="profile-modal">
                                    <div className="profile-modal-mystuff-container">
                                        <div className="profile-modal-mystuff-suncont-head">
                                            <FaRegUserCircle className="profile-modal-user-icon" />
                                            My Stuff
                                        </div>

                                        <div className="profile-modal-mystuff-suncont">
                                            <span className="profile-blank-span"></span>
                                            <span>Online Status</span>
                                            <Switch
                                                defaultChecked={loginState.onlineStatus ? true : undefined}
                                                size="small"
                                                className="profile-modal-switch"
                                                onChange={() => dispatch(handleOnlineStatusClick())}
                                            />
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditRecap())}
                                        >
                                            <GiBananaPeeled className="profile-banana-logo" />
                                            <span>Reddit Recap</span>
                                            <p>New</p>
                                        </div>

                                        <div className="profile-modal-mystuff-suncont" style={{cursor: "not-allowed"}}>
                                            <span className="profile-blank-span"></span>
                                            <span>Profile</span>
                                            <span></span>
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditAvatar())}
                                        >
                                            <span className="profile-blank-span"></span>
                                            <span>Create Avatar</span>
                                            <span></span>
                                        </div>

                                        <div className="profile-modal-mystuff-suncont" style={{cursor: "not-allowed"}}>
                                            <span className="profile-blank-span"></span>
                                            <span>User Settings</span>
                                            <span></span>
                                        </div>
                                    </div>

                                    <hr className="profile-modal-line-break" />

                                    <div className="profile-modal-mystuff-container">
                                        <div className="profile-modal-mystuff-suncont-head">
                                            <IoEyeSharp className="profile-modal-user-icon" />
                                            View Options
                                        </div>

                                        <div className="profile-modal-mystuff-suncont">
                                            <span className="profile-blank-span"></span>
                                            <span>Dark Mode</span>
                                            <Switch
                                                defaultChecked={loginState.isLightModeActive ? undefined : true}
                                                size="small"
                                                className="profile-modal-switch"
                                                onChange={() => dispatch(handleLightModeActive())}
                                            />
                                        </div>
                                    </div>

                                    <hr className="profile-modal-line-break" />

                                    <div className="profile-modal-mystuff-container">
                                        <div 
                                        className="profile-modal-mystuff-suncont"
                                        onClick={() => {
                                            dispatch(handleCreateCommunityClick())
                                            dispatch(handleProfileModal())
                                        }}
                                        >
                                            <CgCommunity className="profile-excess-logo" />
                                            <span>Create a Community</span>
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditAdvertise())}
                                        >
                                            <CiBullhorn className="profile-excess-logo" />
                                            <span>Advertise on Reddit</span>
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditPremium())}
                                        >
                                            <TbPremiumRights className="profile-excess-logo" />
                                            <span>Premium</span>
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditHelpCenter())}
                                        >
                                            <TbHelpCircle className="profile-excess-logo" />
                                            <span>Help Center</span>
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditUserAgreement())}
                                        >
                                            <span className="profile-blank-span"></span>
                                            <span className="profile-modal-excess-texts">User Agreement</span>
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditPrivacyPolicy())}
                                        >
                                            <span className="profile-blank-span"></span>
                                            <span className="profile-modal-excess-texts">Privacy Policy</span>
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditContentPolicy())}
                                        >
                                            <span className="profile-blank-span"></span>
                                            <span className="profile-modal-excess-texts">Content Policy</span>
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditCodeOfConduct())}
                                        >
                                            <span className="profile-blank-span"></span>
                                            <span className="profile-modal-excess-texts">Code of Conduct</span>
                                        </div>
                                    </div>

                                    <hr className="profile-modal-line-break" />

                                    <div className="profile-modal-mystuff-container">
                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={handleLogout}
                                        >
                                            <TbLogout className="profile-excess-logo" />
                                            <span>Log Out</span>
                                        </div>

                                        <p className="reddit-profile-rights-text">Reddit, Inc. © 2023. All rights reserved.</p>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            
            {/* Importing components based on state change  */}
            {loginState.isLoginModalVisible && <SigninAndSignupModal />}
            {loginState.isMessagesActive && <Chat />}
            {loginState.isGetAppActive && <GetApp />}
            {loginState.isMenuActive && <Menu />}
            {loginState.isCreateCommunityActive && <CreateCommunity />}
        </>
    )
}
