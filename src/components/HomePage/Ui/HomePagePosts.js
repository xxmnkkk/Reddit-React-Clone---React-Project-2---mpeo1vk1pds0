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

import { handleLoginButtonClick } from "../../../redux/reducers/loginSlice"

import { CiMenuKebab } from "react-icons/ci";
import { CiFlag1 } from "react-icons/ci";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { GoComment } from "react-icons/go";
import { FiShare } from "react-icons/fi";
import { json } from 'react-router-dom'
import CommentModal from './CommentModal'

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
    }
]



export default function HomePagePosts() {
    const homepageState = useSelector((state) => state.homePageState)
    const loginState = useSelector((state) => state.loginState)
    const dispatch = useDispatch();

    const [sortedPosts, setSortedPosts] = useState([]);

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

    useEffect(() => {
        if (homepageState.homePagePostsData) {
            const sortedData = [...homepageState.homePagePostsData];
            sortedData.sort((a, b) => b.likeCount - a.likeCount);
            setSortedPosts(sortedData);
        }
    }, [homepageState.homePagePostsData]);


    function handleMenuToggle(index) {
        dispatch(setIsPostMenuActive(index))
    }

    // console.log("index", homepageState.activePostIndex);
    // console.log("sorted posts: ", sortedPosts);
    // console.log("selected feed: ", homepageState.selectedFeed);
    console.log("Post data: ", homepageState.homePagePostsData);

    const token = sessionStorage.getItem("token")
    const trimmedToken = token ? token.slice(1, -1) : null;

    const handleUpvoteClick = async (postId) => {
        if (loginState.isLoggedIn) {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${trimmedToken}`,
                        'projectID': 'f104bi07c490'
                    }
                });

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

    const handleDownvoteClick = async (postId) => {
        if (loginState.isLoggedIn) {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${trimmedToken}`,
                        'projectID': 'f104bi07c490'
                    }
                });

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

    const handleCommentClick = async (postId, index) => {
        if (loginState.isLoggedIn) {
            dispatch(setActivePostIndex(index));
            dispatch(handleCommentModal())

            if (homepageState.activePostIndex === index) {
                try {
                    dispatch(setComments([]));

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

    console.log("Comments: ", homepageState.comments);

    return (
        <div className="homepage-posts-section">
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

            {homepageState.homePagePostsData && homepageState.selectedFeed === 'home' &&
                homepageState.homePagePostsData.map((data, index) => (
                    <React.Fragment key={data._id}>
                        <div
                            className={`homepage-post-container ${homepageState.activePostIndex === index && homepageState.isCommentActive && "homepage-post-container-active"}`} >
                            <div className='post-author-info-container'>
                                <div className='post-author-info'>
                                    <img src={data.author.profileImage} />
                                    <span>r/{data.author.name}</span>
                                </div>
                                <div className='post-join-section'>
                                    <span>Join</span>
                                    <div className='post-menu-container'>
                                        <div
                                            className='post-menu-icon-section'
                                            onClick={() => handleMenuToggle(index)}
                                        >
                                            <CiMenuKebab className='post-menu-icon' />
                                        </div>

                                        {homepageState.isPostMenuActive && homepageState.activePostIndex === index &&
                                            <div className='menu-report'>
                                                <CiFlag1 />
                                                Report
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='post-image-and-details-container'>
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

                        {homepageState.isCommentActive && homepageState.activePostIndex === index && <CommentModal />}

                        <hr />
                    </React.Fragment>
                ))
            }

            {sortedPosts && homepageState.selectedFeed === 'popular' &&
                sortedPosts.map((data, index) => (
                    <React.Fragment key={data._id}>
                        <div
                            className={`homepage-post-container ${homepageState.activePostIndex === index && homepageState.isCommentActive && "homepage-post-container-active"}`}
                        >
                            <div className='post-author-info-container'>
                                <div className='post-author-info'>
                                    <img src={data.author.profileImage} />
                                    <span>r/{data.author.name}</span>
                                </div>
                                <div className='post-join-section'>
                                    <span>Join</span>
                                    <div className='post-menu-container'>
                                        <div
                                            className='post-menu-icon-section'
                                            onClick={() => handleMenuToggle(index)}
                                        >
                                            <CiMenuKebab className='post-menu-icon' />
                                        </div>

                                        {homepageState.isPostMenuActive && homepageState.activePostIndex === index &&
                                            <div className='menu-report'>
                                                <CiFlag1 />
                                                Report
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='post-image-and-details-container'>
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

                            {homepageState.isCommentActive && homepageState.activePostIndex === index && <CommentModal />}
                        </div>

                        <hr />
                    </React.Fragment>
                ))
            }
        </div>
    )
}
