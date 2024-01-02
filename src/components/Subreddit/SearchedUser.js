import axios from 'axios'
import "./styles/searchedUser.scss"
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { handleSearchModal } from '../../redux/reducers/loginSlice';
import {setHomePagePostsData} from "../../redux/reducers/homePageSlice"
import {setSearchedData , setFollowing} from "../../redux/reducers/searchSlice"

import { CiMenuKebab } from "react-icons/ci";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { GoComment } from "react-icons/go";
import { FiShare } from "react-icons/fi";
import { GiSpotedFlower } from "react-icons/gi";
import { FaBirthdayCake } from "react-icons/fa";

export default function Subreddit() {
    const searchState = useSelector((state) => state.searchState);
    const homepageState = useSelector((state) => state.homepageState);
    // const loginState = useSelector((state) => state.loginState)
    const dispatch = useDispatch();
    const searchedData = searchState.searchedData.data
    // const searchedData = Array.isArray(searchState.searchedData) ? searchState.searchedData : [];

    console.log("searched data: ", searchedData);

    return (
        <div className='reddit-user-container'>
            <div className='reddit-user-post-container'>
                {searchedData &&
                    searchedData.map((data, index) => (
                        <div className='reddit-post-container' key={index}>
                            <div
                                className={`homepage-post-container`} >
                                <div className='post-author-info-container'>
                                    <div className='post-author-info'>
                                        <img src={data.author.profileImage} />
                                        <span>r/{data.author.name}</span>
                                    </div>
                                    <div className='post-join-section'>
                                        <div className='post-menu-container'>
                                            <div
                                                className='post-menu-icon-section'
                                                onClick={() => handleMenuToggle(index)}
                                            >
                                                <CiMenuKebab className='post-menu-icon' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='post-image-and-details-container'>
                                    <p>{data.content}</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))
                }
            </div>

            <div className='reddit-user-info-container'>
                <div className='blue-bar'>
                    <div className='reddit-user-image-div'>
                        <img src={searchedData[0].author.profileImage} />
                    </div>
                </div>
                <div className='reddit-user-name'>u/{searchedData[0].author.name}</div>
                <div className='reddit-user-karma-container'>
                    <div className='karma-container'>
                        <p>Karma</p>
                        <div>
                            <GiSpotedFlower className='reddit-user-icon'/>
                            <span>1000</span>
                        </div>
                    </div>
                    <div className='karma-container'>
                        <p>Cake Day</p>
                        <div>
                            <FaBirthdayCake className='reddit-user-icon'/>
                            <span>January 01, 2024</span>
                        </div>
                    </div>
                </div>
                <div className='follow' onClick={() => dispatch(setFollowing())}>{searchState.isFollowing ? "Following" : "Follow"}</div>
            </div>
        </div>
    )
}