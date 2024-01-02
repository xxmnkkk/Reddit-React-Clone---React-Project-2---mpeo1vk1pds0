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
    handleOnlineStatusClick
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
import { CiSearch } from "react-icons/ci"
import { BsQrCodeScan } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { GiBananaPeeled } from "react-icons/gi";
import GetApp from "./Ui/GetApp.js";
import Menu from "./Ui/Menu.js";
import CreateCommunity from "./Ui/CreateCommunity.js";
import { useNavigate } from "react-router-dom";


export default function NavBar() {
    const loginState = useSelector((state) => state.loginState);
    const externalWebsiteState = useSelector((state) => state.externalWebsiteState);
    const feedSelectorState = useSelector((state) => state.feedSelectorState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));
    const token = sessionStorage.getItem("token")

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
            <div className='navbar-container'>
                <div className='navbar-logo-container'>
                    <img src={RedditLogo} />
                    reddit
                </div>

                {loginState.isLoggedIn &&
                    <LoggedInFeedSelector />
                }

                <Search />

                <div className="navbar-signin-container">
                    {loginState.isLoggedIn &&
                        <div
                            className="navbar-auth-logo-container"
                            onClick={() => {
                                dispatch(setSelectedFeed("popular"));
                                dispatch(setIndex(1));
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

                    <p></p>
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
                                    <p>{loggedInUser.name}</p>
                                    <div>
                                        <GiFlowerEmblem className="karma-flower-icon" />
                                        1 karma
                                    </div>
                                </div>
                                <RiArrowDropDownLine className="loggedin-user-dowpdown" />
                            </div>

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
                                            <Switch size="small" className="profile-modal-switch" onChange={() => dispatch(handleOnlineStatusClick())} />
                                        </div>

                                        <div
                                            className="profile-modal-mystuff-suncont"
                                            onClick={() => dispatch(navigateToRedditRecap())}
                                        >
                                            <GiBananaPeeled className="profile-banana-logo" />
                                            <span>Reddit Recap</span>
                                            <p>New</p>
                                        </div>

                                        <div className="profile-modal-mystuff-suncont">
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

                                        <div className="profile-modal-mystuff-suncont">
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
                                            <Switch defaultChecked size="small" className="profile-modal-switch" />
                                        </div>
                                    </div>

                                    <hr className="profile-modal-line-break" />

                                    <div className="profile-modal-mystuff-container">
                                        <div className="profile-modal-mystuff-suncont">
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
                                            <TbLogout />
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

            {loginState.isLoginModalVisible && <SigninAndSignupModal />}
            {loginState.isMessagesActive && <Chat />}
            {loginState.isGetAppActive && <GetApp />}
            {loginState.isMenuActive && <Menu />}
            {loginState.isCreateCommunityActive && <CreateCommunity />}
        </>
    )
}