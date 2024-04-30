import React, { useRef, useState } from 'react'
import "../Styles/createCommunity.scss"
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { handleCreateCommunityClick } from "../../../redux/reducers/loginSlice"
import { setCommunityCreated } from "../../../redux/reducers/homePageSlice"
import { IoCloseOutline } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";



export default function CreateCommunity() {
    // State to set the success message div true/false
    const [successActive, setSuccessActive] = useState(false)

    const loginState = useSelector((state) => state.loginState);
    const dispatch = useDispatch();

    // using ref for input so that there are no re-renders during typing
    const titleRef = useRef()
    const descriptionRef = useRef()
    const imageUrlRef = useRef()

    // creating community works from the below function which calls and api with all the details appended to a form
    const handleCreateCommunityButton = async () => {
        const token = sessionStorage.getItem("token");
        const trimmedToken = token ? token.slice(1, -1) : null;

        const formData = new FormData();
        formData.append('name', titleRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('images', imageUrlRef.current.value);

        // if (imageUrlRef) {
        //     const imageResponse = await fetch(imageUrlRef);
        //     const blob = await imageResponse.blob();
        //     // formData.append('images', blob, 'image.jpg');
        //     formData.append('images', blob, 'image.jpg');

        // }

        // if(imageUrlRef.current && imageUrlRef.current.files.length > 0){
        //     const imageFile = imageUrlRef.current.files[0];
        //     formData.append('images', imageFile, imageFile.name);
        // }

        axios.post("https://academics.newtonschool.co/api/v1/reddit/channel", formData, {
            headers: {
                'Authorization': `Bearer ${trimmedToken}`,
                'projectID': 'f104bi07c490'
            },
        })
            .then(response => {
                console.log(response.data);
                setSuccessActive(true);
                dispatch(setCommunityCreated())

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
            {/* Basic code for create communnity modal content */}
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

                        <div className='create-community-input-containers' >
                            <p>Upload Image</p>
                            <input
                                ref={imageUrlRef}
                                type='file'
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none'
                                }}
                            />
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

            {/* Loading the succes message div right here so that if creating a community is successful the message actually shows up on screen */}
            {successActive && <div className='success-message-div'><RiRobot2Fill className='robot-icon' /> Successfully Created</div>}
        </>
    )
}







