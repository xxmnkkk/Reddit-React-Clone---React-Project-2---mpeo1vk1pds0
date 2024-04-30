import React, { useEffect, useState } from 'react'
import "../styles/homePagePosts.scss"
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import {
    setHomePagePostsData,
    setIsPostMenuActive,
    setActivePostIndex,
    handleCommentModal,
    setComments
} from '../../../redux/reducers/homePageSlice'

import { handleLoginButtonClick, handleCreateCommunityClick } from "../../../redux/reducers/loginSlice"

import { CiMenuKebab } from "react-icons/ci";
import { CiFlag1 } from "react-icons/ci";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { GoComment } from "react-icons/go";
import { FiShare } from "react-icons/fi";
import { json } from 'react-router-dom'
import CommentModal from './CommentModal'

// An array of object with details of image and other necessary details thats going to show up when popular posts tab is selected.
const postSliderData = [
    {
        image: "https://external-preview.redd.it/18-year-old-gta-vi-hacker-ordered-to-life-in-hospital-over-v0-j7Q_X-M3-s8RAwPGnN8u6ismKlYRguKK4DvjYuDiV1w.jpg?auto=webp&s=f893ecd7b299d7dfdc98c55bc325830abb400934",
        text: "18-year-old GTA VI hacker ordered to life in hospital over leaked clips",
        channel: "r/rockstar "
    },
    {
        image: "https://pbs.twimg.com/media/GB7JazUWkAAay8Y?format=jpg&name=large",
        text: "Yoshinobu Yamamoto is headed to the Los Angeles Dodgers",
        channel: "r/mlb "
    },
    {
        image: "https://preview.redd.it/its-happening-v0-o2p0rdakxv7c1.jpeg?auto=webp&s=eb6a18c7f8b2f3403e55886a867b64b3384e4350",
        text: "It's happening!",
        channel: "r/cfbmemes "
    },
    {
        image: "https://i.redd.it/apple-vision-pro-available-in-the-u-s-on-february-2-v0-uo801aw4wcbc1.png?s=bbefcec1ee6f95e71cd0a66a37698e387dcfce54",
        text: "APPLE VISION PRO AVAILABLE IN THE U.S. ON FEBRUARY 2",
        channel: "r/Nextech3Dai "
    },
    {
        image: "https://i.redd.it/hidden-red-dead-redemption-2-reference-on-gta-6-trailer-v0-1z036c68pibc1.jpeg?s=669c16519aa2475e0a1294ba3197abecb3ed3754",
        text: "Hidden RDR2 reference on gta 6 trailer?",
        channel: "r/CourseWorried2500"
    }
]



export default function HomePagePosts() {
    const homepageState = useSelector((state) => state.homePageState)
    const loginState = useSelector((state) => state.loginState)
    const dispatch = useDispatch();

    const [sortedPosts, setSortedPosts] = useState([]);
    const [joined, setJoined] = useState(false);

    // Storing all of the users im following here manually 
    const [joinedStatus, setJoinedStatus] = useState({});

    // Calling the api for posts when weppage gets loaded up
    useEffect(() => {
        const config = {
            headers: {
                projectID: "f104bi07c490"
            }
        }

        axios.get("https://academics.newtonschool.co/api/v1/reddit/post?limit=100", config)
            .then((response) => {
                dispatch(setHomePagePostsData(response.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    }, [dispatch]);

    // Simple logic for sorting the post based on like count to show up when popular community tab is selected
    useEffect(() => {
        if (homepageState.homePagePostsData) {
            const sortedData = [...homepageState.homePagePostsData];
            sortedData.sort((a, b) => b.likeCount - a.likeCount);
            setSortedPosts(sortedData);
        }
    }, [homepageState.homePagePostsData]);


    function handleMenuToggle(index) {
        dispatch(setActivePostIndex(index))
        dispatch(setIsPostMenuActive())
    }

    console.log("index", homepageState.activePostIndex);
    console.log("sorted posts: ", sortedPosts);
    console.log("selected feed: ", homepageState.selectedFeed);
    console.log("Post data: ", homepageState.homePagePostsData);

    const token = sessionStorage.getItem("token")
    const trimmedToken = token ? token.slice(1, -1) : null;

    // Fucntion for hanndling upvote click
    const handleUpvoteClick = async (postId) => {
        // Suppose to be allowed only when the user is logged in so that is being checked here 
        if (loginState.isLoggedIn) {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${trimmedToken}`,
                        'projectID': 'f104bi07c490'
                    }
                });

                // Here checking if response received and basically updating the like count for whatever post i have liked. So basically im matching the id of the post and updating it so that it reflects on the screen instead of calling the whole api again
                if (response.ok) {
                    const updatedPosts = homepageState.homePagePostsData.map(post => {
                        if (post._id === postId) {
                            return {
                                ...post,
                                likeCount: post.likeCount + 1
                            };
                        }
                        return post;
                    });

                    dispatch(setHomePagePostsData(updatedPosts));
                }
            } catch (error) {
                console.error('Error during upvote:', error);
            }
        }
        else {
            dispatch(handleLoginButtonClick())
        }
    };

    // Function for handling downvote click
    const handleDownvoteClick = async (postId) => {
        // Suppose to be allowed only when the user is logged in so that is being checked here 
        if (loginState.isLoggedIn) {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${trimmedToken}`,
                        'projectID': 'f104bi07c490'
                    }
                });

                // Same logic as above just additional thinking of whether a post has 0 likes, then just skipping it 
                if (response.ok) {
                    const updatedPosts = homepageState.homePagePostsData.map(post => {
                        if (post._id === postId) {
                            return {
                                ...post,
                                likeCount: Math.max(0, post.likeCount - 1)
                            };
                        }
                        return post;
                    });

                    dispatch(setHomePagePostsData(updatedPosts));
                }
            } catch (error) {
                console.error('Error during downvote:', error);
            }
        }
        else {
            dispatch(handleLoginButtonClick())
        }
    };

    // Function for handling comment click which sets the comment data inside of the state
    const handleCommentClick = async (postId, index) => {
        if (loginState.isLoggedIn) {
            dispatch(setActivePostIndex(index));
            dispatch(handleCommentModal())

            if (homepageState.activePostIndex === index) {
                try {
                    // If any data inside the comment state im setting it to empty array
                    dispatch(setComments([]));

                    // Calling the api and setting the data inside of the state
                    const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${trimmedToken}`,
                            'projectID': 'f104bi07c490'
                        }
                    })
                    const data = await response.json();
                    dispatch(setComments(data.data))
                }
                catch (error) {
                    console.error('Error during downvote:', error);
                }
            }
        }
        else {
            dispatch(handleLoginButtonClick())
        }
    }

    // console.log("Comments: ", homepageState.comments);

    return (
        <div className={`homepage-posts-section ${loginState.isLightModeActive && "homepage-posts-section-light"}`}>
            {/* If popular feed is selected, then im displaying the slider. Just mapping out the object mentioned outside of the component above*/}
            {homepageState.selectedFeed === "popular" &&
                <div className='homepage-post-popular-slider'>
                    {postSliderData &&
                        postSliderData.map((data, index) => (
                            <div className='post-slider-card-container' key={index}>
                                <img src={data.image} />
                                <p>{data.text}</p>
                                <span>{data.channel}<span>and more</span></span>
                            </div>
                        ))
                    }
                </div>
            }
            <hr />

            {/* If home page, then the following code gets executed */}
            {homepageState.homePagePostsData && homepageState.selectedFeed === 'home' &&
                homepageState.homePagePostsData.map((data, index) => (
                    <React.Fragment key={data._id}>
                        <div
                            className={`homepage-post-container ${homepageState.activePostIndex === index && homepageState.isCommentActive && "homepage-post-container-active"}`} >
                            <div className='post-author-info-container'>
                                <div className='post-author-info'>
                                    <img src={data?.author?.profileImage} />
                                    <span>r/{data?.author?.name}</span>
                                </div>
                                <div className='post-join-section'>
                                    <span
                                        // Here just toggling the join/joined functionality on users post 
                                        onClick={() => {
                                            dispatch(setActivePostIndex(index))

                                            setJoinedStatus(prevStatus => {
                                                const newStatus = { ...prevStatus };
                                                newStatus[index] = !newStatus[index];
                                                return newStatus;
                                            });
                                        }}
                                    >
                                        {joinedStatus[index] ? "Joined" : "Join"}
                                    </span>
                                    <div className='post-menu-container'>
                                        <div
                                            className='post-menu-icon-section'
                                            onClick={() => handleMenuToggle(index)}
                                        >
                                            <CiMenuKebab className='post-menu-icon' />
                                        </div>

                                        {homepageState.isPostMenuActive && homepageState.activePostIndex === index &&
                                            <div className='menu-report'>
                                                <CiFlag1 className='post-menu-icon post-menu-icon-2' />
                                                Report
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='post-image-and-details-container'>
                                {/* {data.images &&
                                    <div style={{
                                        height: "350px",
                                        width: "100%",
                                        overflow: "hidden",
                                        borderRadius: "10px",
                                        marginBottom: "10px"
                                    }}>
                                        <img src={data.images[0]} style={{
                                            minWidth: "100%",
                                            minHeight: "50%"
                                        }} />
                                    </div>
                                } */}

                                {data.images &&
                                    <div className="image-container">
                                        <img src={data.images[0]} alt="Uploaded image" />
                                    </div>
                                }

                                <p>{data.content}</p>
                            </div>

                            <div className='post-interaction-container'>
                                <div className='post-interaction-subcont'>
                                    <TiArrowUpOutline
                                        className='post-interaction-icon'
                                        onClick={() => handleUpvoteClick(data._id)}
                                    />
                                    {data.likeCount}
                                    <TiArrowDownOutline
                                        className='post-interaction-icon'
                                        onClick={() => handleDownvoteClick(data._id)}
                                    />
                                </div>
                                <div
                                    className='post-interaction-subcont post-curse'
                                    onClick={() => handleCommentClick(data._id, index)}
                                >
                                    <GoComment className='post-interaction-icon-1' />
                                    {data.commentCount}
                                </div>
                                <div className='post-interaction-subcont post-curse'>
                                    <FiShare className='post-interaction-icon-1' />
                                    Share
                                </div>
                            </div>
                        </div>

                        {loginState.isLoggedIn && homepageState.isCommentActive && homepageState.activePostIndex === index && <CommentModal />}

                        <hr />
                    </React.Fragment>
                ))
            }

            {/* If home page, then the following code gets executed */}
            {sortedPosts && homepageState.selectedFeed === 'popular' &&
                sortedPosts.map((data, index) => (
                    <React.Fragment key={data._id}>
                        <div
                            className={`homepage-post-container ${homepageState.activePostIndex === index && homepageState.isCommentActive && "homepage-post-container-active"}`}
                        >
                            <div className='post-author-info-container'>
                                <div className='post-author-info'>
                                    <img src={data?.author?.profileImage} />
                                    <span>r/{data?.author?.name}</span>
                                </div>
                                <div className='post-join-section'>
                                    {/* <span>Join</span> */}
                                    <span
                                        // Here just toggling the join/joined functionality on users post 
                                        onClick={() => {
                                            dispatch(setActivePostIndex(index))

                                            setJoinedStatus(prevStatus => {
                                                const newStatus = { ...prevStatus };
                                                newStatus[index] = !newStatus[index];
                                                return newStatus;
                                            });
                                        }}
                                    >
                                        {joinedStatus[index] ? "Joined" : "Join"}
                                    </span>
                                    <div className='post-menu-container'>
                                        <div
                                            className='post-menu-icon-section'
                                            onClick={() => handleMenuToggle(index)}
                                        >
                                            <CiMenuKebab className='post-menu-icon' />
                                        </div>

                                        {homepageState.isPostMenuActive && homepageState.activePostIndex === index &&
                                            <div className='menu-report'>
                                                <CiFlag1 className='post-menu-icon' />
                                                Report
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='post-image-and-details-container'>
                                {/* {data.images &&
                                    <div style={{
                                        height: "350px",
                                        width: "100%",
                                        overflow: "hidden",
                                        borderRadius: "10px",
                                        marginBottom: "10px"
                                    }}>
                                        <img src={data.images[0]} style={{
                                            minWidth: "100%",
                                            minHeight: "50%"
                                        }} />
                                    </div>
                                } */}

                                {data.images &&
                                    <div className="image-container">
                                        <img src={data.images[0]} alt="Uploaded image" />
                                    </div>
                                }

                                <p>{data.content}</p>
                            </div>

                            <div className='post-interaction-container'>
                                <div className='post-interaction-subcont'>
                                    <TiArrowUpOutline
                                        className='post-interaction-icon'
                                        onClick={() => handleUpvoteClick(data._id)}
                                    />
                                    {data.likeCount}
                                    <TiArrowDownOutline
                                        className='post-interaction-icon'
                                        onClick={() => handleDownvoteClick(data._id)}
                                    />
                                </div>
                                <div
                                    className='post-interaction-subcont post-curse'
                                    onClick={() => handleCommentClick(data._id, index)}
                                >
                                    <GoComment className='post-interaction-icon-1' />
                                    {data.commentCount}
                                </div>
                                <div className='post-interaction-subcont post-curse'>
                                    <FiShare className='post-interaction-icon-1' />
                                    Share
                                </div>
                            </div>

                            {loginState.isLoggedIn && homepageState.isCommentActive && homepageState.activePostIndex === index && <CommentModal />}
                        </div>

                        <hr />
                    </React.Fragment>
                ))
            }
        </div>
    )
}
