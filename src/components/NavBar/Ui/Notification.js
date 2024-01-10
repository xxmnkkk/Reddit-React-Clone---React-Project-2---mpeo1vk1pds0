import React from 'react'
import "../Styles/notification.scss"
import { IoMdClose } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import { GiBananaBunch } from "react-icons/gi";

import { useDispatch, useSelector } from 'react-redux';
import { navigateToRedditRecap } from '../../../redux/reducers/externalWebsiteSlice';

export default function () {
    const loginState = useSelector((state) => state.loginState)
    const dispatch = useDispatch()

    return (
        <div className={`notification-modal ${loginState.isLightModeActive && "notification-modal-light"}`}>
            <div
                className='notification-reddit-recap-container'
                onClick={() => dispatch(navigateToRedditRecap())}
            >
                <div className='reddit-title-bar'>
                    <span>Reddit Recap 2023</span>
                </div>
                <div className='notification-reddit-text'>
                    <div className='notification-reddit-text-subcont'>
                        <p>2023 is over,</p>
                        <p>let's Recap</p>
                    </div>
                    <GiBananaBunch className='noti-banana-icon' />
                </div>
            </div>

            <div className='notification-text'>
                <img src='https://www.redditstatic.com/desktop2x/img/wrappedreddit/default_avatar.png' />
                <h3>You don’t have any activity yet</h3>
                <p>That’s ok, maybe you just need the right inspiration.</p>
            </div>
        </div>
    )
}
