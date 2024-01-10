import React from 'react'
import "../styles/homePageSideNavbar.scss"

import {
    setSelectedFeed,
    setIsTopicsActive,
    setIsResourcesActive,
    setIsPopularPostActive
} from "../../../redux/reducers/homePageSlice"
import { useSelector, useDispatch } from "react-redux";

import { AiFillHome } from "react-icons/ai";
import { CgArrowTopRightO } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaPlaystation } from "react-icons/fa";
import { MdOutlineSportsBaseball } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { FaBitcoin } from "react-icons/fa";
import { PiTelevision } from "react-icons/pi";
import { IoStarHalfSharp } from "react-icons/io5";
import { PiRobotThin } from "react-icons/pi";
import { CiBullhorn } from "react-icons/ci";
import { MdOutlineHelpOutline } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import { AiOutlineTool } from "react-icons/ai";
import { LuMic2 } from "react-icons/lu";
import { CgCommunity } from "react-icons/cg";
import { IoHourglassOutline } from "react-icons/io5";
import { MdOutlineTopic } from "react-icons/md";
import { MdContentPaste } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";




export default function HomePageSideNavBar() {
    const homePageState = useSelector((state) => state.homePageState);
    const loginState = useSelector((state) => state.loginState)
    const dispatch = useDispatch();

    return (
        <div className={`homepage-side-navbar-container ${loginState.isLightModeActive && "homepage-side-navbar-container-light"}`}>
            <div className="homepage-feed-selector-container">
                <div
                    className={`homepage-feed-selector ${homePageState.selectedFeed === "home" && "homepage-feed-selector-active"}`}
                    onClick={() => dispatch(setSelectedFeed("home"))}
                >
                    <AiFillHome className="homepage-feed-icon" />
                    Home
                </div>

                <div
                    className={`homepage-feed-selector ${homePageState.selectedFeed === "popular" && "homepage-feed-selector-active"}`}
                    onClick={() => dispatch(setSelectedFeed("popular"))}
                >
                    <CgArrowTopRightO className="homepage-feed-icon" />
                    Popular
                </div>
            </div>

            <hr className='homepage-sidenav-line-breaker' />

            <div className='homepage-excess-container'>
                <div
                    className='homepage-excess-title'
                    onClick={() => dispatch(setIsTopicsActive())}
                >
                    <span>TOPICS</span>
                    <RiArrowDropDownLine className={`homepage-excess-dropdown ${homePageState.isTopicsActive && "homepage-excess-dropdown-active"}`} />
                </div>

                {homePageState.isTopicsActive &&
                    <>
                        <div className='homepage-excess-text'>
                            <FaPlaystation className='sidenav-icon'/>
                            <span>Gaming</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <MdOutlineSportsBaseball className='sidenav-icon'/>
                            <span>Sports</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <FcStatistics className='sidenav-icon'/>
                            <span>Business</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <FaBitcoin className='sidenav-icon'/>
                            <span>Crypto</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <PiTelevision className='sidenav-icon'/>
                            <span>Television</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <IoStarHalfSharp className='sidenav-icon'/>
                            <span>Celebrity</span>
                        </div>
                    </>
                }
            </div>

            <hr className='homepage-sidenav-line-breaker' />

            <div className='homepage-excess-container'>
                <div
                    className='homepage-excess-title'
                    onClick={() => dispatch(setIsResourcesActive())}
                >
                    <span>RESOURCES</span>
                    <RiArrowDropDownLine className={`homepage-excess-dropdown ${homePageState.isResourcesActive && "homepage-excess-dropdown-active"}`} />
                </div>

                {homePageState.isResourcesActive &&
                    <>
                        <div className='homepage-excess-text'>
                            <PiRobotThin className='sidenav-icon'/>
                            <span>About Reddit</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <CiBullhorn className='sidenav-icon'/>
                            <span>Advertise</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <MdOutlineHelpOutline className='sidenav-icon'/>
                            <span>Help</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <BsBook className='sidenav-icon'/>
                            <span>Blog</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <AiOutlineTool className='sidenav-icon'/>
                            <span>Careers</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <LuMic2 className='sidenav-icon'/>
                            <span>Press</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <CgCommunity className='sidenav-icon'/>
                            <span>Communities</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <IoHourglassOutline className='sidenav-icon'/>
                            <span>Best of Reddit</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <MdOutlineTopic className='sidenav-icon'/>
                            <span>Topics</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <MdContentPaste className='sidenav-icon'/>
                            <span>Content Policy</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <FaBalanceScale className='sidenav-icon'/>
                            <span>Privacy Policy</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <FaFileContract className='sidenav-icon'/>
                            <span>User Agreement</span>
                        </div>
                    </>
                }
            </div>

            <hr className='homepage-sidenav-line-breaker' />

            <div className='homepage-excess-container'>
                <div
                    className='homepage-excess-title'
                    onClick={() => dispatch(setIsPopularPostActive())}
                >
                    <span>POPULAR POSTS</span>
                    <RiArrowDropDownLine className={`homepage-excess-dropdown ${homePageState.isPopularPostActive && "homepage-excess-dropdown-active"}`} />
                </div>

                {homePageState.isPopularPostActive &&
                    <>
                        <div className='homepage-excess-text'>
                            <span>English / Global</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <span>Deutsch</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <span>Español</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <span>Français</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <span>Italiano</span>
                        </div>

                        <div className='homepage-excess-text'>
                            <span>Português</span>
                        </div>
                    </>
                }
            </div>

            <p className="homepage-side-navbar-rights">Reddit, Inc. © 2023. All rights reserved.</p>
        </div>
    )
}
