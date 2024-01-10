import React, { useRef, useState } from 'react'
import "./styles/createPost.scss"
import "../NavBar/Styles/createCommunity.scss"
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { RiRobot2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';


export default function CreatePost() {
    const loginState = useSelector((state) => state.loginState)

    const [successActive, setSuccessActive] = useState(false)
    const location = useLocation();
    const titleRef = useRef();
    const contentRef = useRef();
    const imageUrlRef = useRef();

    const handleCreatePostClick = () => {
        const token = sessionStorage.getItem("token");
        const trimmedToken = token ? token.slice(1, -1) : null;

        const formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('content', contentRef.current.value);
        formData.append('images', imageUrlRef.current.value);

        const config = {
            headers: {
                Authorization: `Bearer ${trimmedToken}`,
                projectID: "f104bi07c490",
                'Content-Type': 'multipart/form-data',
            }
        }
        axios.post("https://academics.newtonschool.co/api/v1/reddit/post/", formData, config)
            .then(response => {
                console.log(response.data);
                setSuccessActive(true);
                setTimeout(() => {
                    setSuccessActive(false)
                }, 5000)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // console.log(location.pathname);
    return (
        <>
            <div className={`create-post-main-container ${loginState.isLightModeActive && "create-post-main-container-light"}`}>
                <div className='createpost-information-taker-container'>
                    <div className='create-community-modal-header'>
                        <p>Create a Post</p>
                    </div>

                    <div className='create-community-modal-info-container'>
                        <div className='create-community-input-containers'>
                            <p>Title</p>
                            <span>Community names including capitalization cannot be changed.</span>
                            <input ref={titleRef} type='text' placeholder='Title' />
                        </div>

                        <div className='create-community-input-containers'>
                            <p>Content</p>
                            <textarea className='textarea-post' style={{ height: "250px" }} ref={contentRef} typeof='text' placeholder='Text (Write down your content)' />
                        </div>

                        <div className='create-community-input-containers'>
                            <p>Image URL</p>
                            <input ref={imageUrlRef} type='text' placeholder='URL' />
                        </div>

                        <div className='post-container'>
                            <div
                                className='post-button'
                                onClick={handleCreatePostClick}
                            >Post</div>
                        </div>
                    </div>

                    <div className='create-post-notification-container'>
                        <div>
                            <input type='radio' />
                            Send me post reply notifications
                        </div>
                        <p>Connect accounts to share your posts</p>
                    </div>
                </div>

                <div className='createpost-rules'>
                    <div>
                        <img src='https://styles.redditmedia.com/t5_2qh4a/styles/communityIcon_7kecd4uf4a3c1.png' />
                        <p>Posting to Reddit</p>
                    </div>
                    <hr />
                    <p>1. Remember the human</p>
                    <hr />
                    <p>2. Behave like you would in real life</p>
                    <hr />
                    <p>3. Look for the original source of content</p>
                    <hr />
                    <p>4. Search for duplicates before posting</p>
                    <hr />
                    <p>5. Read the community’s rules</p>
                </div>
            </div>

            {successActive && <div className='success-message-div'><RiRobot2Fill className='robot-icon' /> Successfully posted</div>}
        </>
    )
}
