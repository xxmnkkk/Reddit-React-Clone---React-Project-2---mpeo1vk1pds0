import React, { useEffect } from 'react'
import "../styles/popularCommunities.scss"
import "../styles/homePage.scss"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setPopularCommunnitiesData, handleShowMoreClick } from '../../../redux/reducers/homePageSlice'
import {handleLoginButtonClick} from "../../../redux/reducers/loginSlice"
import {setSubredditUserId} from "../../../redux/reducers/searchedUserSlice"
import { useNavigate } from 'react-router-dom'

export default function PopularCommunities() {
    const homepageState = useSelector((state) => state.homePageState)
    const loginState = useSelector((state) => state.loginState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Calling the api for getting the popular communities data nd storing it inside of the state
    useEffect(() => {
        const config = {
            headers: {
                projectID: "f104bi07c490"
            }
        }

        axios.get("https://academics.newtonschool.co/api/v1/reddit/channel?limit=1000", config)
            .then((response) => {
                dispatch(setPopularCommunnitiesData(response.data.data))
                console.log("Popular community data: ", response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [homepageState.communityCreated])

    // If user is logged in then navigating them to the respective subreddit page 
    const handleSubredditNavigate = (userId) => {
        if(!loginState.isLoggedIn){
            dispatch(handleLoginButtonClick())
        }
        else{
            dispatch(setSubredditUserId(userId))
            navigate("/subreddit");
        }
    }

    // console.log("Popular communities",homepageState.popularCommunitiesData);

    return (
        // Basic code for implementing the popular communities(Subreddits) data 
        <div className={`popular-community-section popular-community-section-ipad ${homepageState.selectedFeed === "popular" && "popular-community-section-popularactive"} ${loginState.isLightModeActive && "popular-community-section-light"}`}>
            <div className={`popular-community-container ${homepageState.isShowMoreActive && "popular-community-container-expanded"}`}>
                <h3>POPULAR COMMUNITIES</h3>

                <div className='popular-community-data-container'>
                    {homepageState.popularCommunitiesData &&
                        homepageState.popularCommunitiesData.map((data, index) => (
                            <div 
                            className='popular-community-data' key={index}
                            onClick={() => handleSubredditNavigate(data._id)}
                            >
                                <img src={data.image} />
                                <div>
                                    <p>r/{data.name}</p>
                                    <span>Owner: {data.owner.name}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div
                className='popular-community-extendor-button'
                onClick={() => dispatch(handleShowMoreClick())}
            >
                {homepageState.isShowMoreActive ? "See Less" : "See More"}
            </div>
        </div>
    )
}