import React, { useRef, useState } from 'react'
import "../Styles/createCommunity.scss"
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { handleCreateCommunityClick } from "../../../redux/reducers/loginSlice"

import { IoCloseOutline } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";



export default function CreateCommunity() {
    const [successActive, setSuccessActive] = useState(false)

    const loginState = useSelector((state) => state.loginState);
    const dispatch = useDispatch();

    const titleRef = useRef()
    const descriptionRef = useRef()
    const imageUrlRef = useRef()

    const handleCreateCommunityButton = async () => {
        const token = sessionStorage.getItem("token");
        const trimmedToken = token ? token.slice(1, -1) : null;

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${trimmedToken}`,
        //         projectID: "f104bi07c490",
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: titleRef.current.value,
        //         description: descriptionRef.current.value,
        //         images: imageUrlRef.current.value
        //     })
        // }
        // axios.post("https://academics.newtonschool.co/api/v1/reddit/channel/", config)
        //     .then(response => {
        //         console.log(response.data);
        //         setSuccessActive(true);
        //         setTimeout(() => {
        //             setSuccessActive(false)
        //             dispatch(handleCreateCommunityClick())
        //         }, 5000)
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });




        fetch('https://academics.newtonschool.co/api/v1/reddit/channel/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${trimmedToken}`,
                'projectID': 'f104bi07c490',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: titleRef.current.value,
                description: descriptionRef.current.value,
                images: imageUrlRef.current.value
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setSuccessActive(true);
                setTimeout(() => {
                    setSuccessActive(false)
                    dispatch(handleCreateCommunityClick())
                }, 5000)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div className='create-community-modal-layover'>
                <div className={`create-community-modal-container ${loginState.isLightModeActive && "create-community-modal-container-light"}`}>
                    <div className='create-community-modal-header'>
                        <p>Create a community</p>
                        <IoCloseOutline
                            className='create-community-modal-close-icon'
                            onClick={() => dispatch(handleCreateCommunityClick())}
                        />
                    </div>

                    <div className='create-community-modal-info-container'>
                        <div className='create-community-input-containers'>
                            <p>Name</p>
                            <span>Community names including capitalization cannot be changed.</span>
                            <input ref={titleRef} type='text' placeholder='r/' />
                        </div>

                        <div className='create-community-input-containers'>
                            <p>Description</p>
                            <textarea ref={descriptionRef} typeof='text' placeholder='post description' />
                        </div>

                        <div className='create-community-input-containers'>
                            <p>Image URL</p>
                            <input ref={imageUrlRef} type='text' placeholder='URL' />
                        </div>
                    </div>

                    <div className='create-community-type-container'>
                        <h3>Community type</h3>
                        <label>
                            <input type='radio' name='createCommunityRadioButtons' defaultChecked />
                            Public
                            <span>Anyone can view, post, and comment to this community</span>
                        </label>

                        <label>
                            <input type='radio' name='createCommunityRadioButtons' />
                            Restricted
                            <span>Anyone can view this community, but only approved users can post</span>
                        </label>

                        <label>
                            <input type='radio' name='createCommunityRadioButtons' />
                            Private
                            <span>Only approved users can view and submit to this community</span>
                        </label>
                    </div>

                    <div className='create-community-type-container'>
                        <h3>Adult content</h3>
                        <label>
                            <input type='radio' name='adultcontent' />
                            <div>NSFW</div>
                            <span>Anyone can view, post, and comment to this community</span>
                        </label>
                    </div>

                    <div className='create-community-submit-container'>
                        <div
                            className='create-community-submit-button'
                            onClick={handleCreateCommunityButton}
                        >Create Community</div>
                    </div>
                </div>
            </div>

            {successActive && <div className='success-message-div'><RiRobot2Fill className='robot-icon' /> Successfully Created</div>}
        </>
    )
}
