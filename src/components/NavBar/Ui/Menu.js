import React from 'react'
import "../Styles/menu.scss"

import { useDispatch, useSelector } from 'react-redux';
import { navigateToRedditAdvertise , navigateToRedditAvatar} from "../../../redux/reducers/externalWebsiteSlice"
import {handleLoginButtonClick , handleIsMenuActive} from "../../../redux/reducers/loginSlice"

import { IoLogOutOutline } from "react-icons/io5";
import { TbPointerHeart } from "react-icons/tb";
import { IoBagHandleOutline } from "react-icons/io5";

export default function Menu() {
  const loginState = useSelector((state) => state.loginState)
  const dispatch = useDispatch();

  // This function basically sets the menu false and login modal to true 
  const handleMenuButtonClick = () => {
    dispatch(handleIsMenuActive())
    dispatch(handleLoginButtonClick())
  }

  return (
    // Basic code for the ui of menu 
    
    <div className={`menu-container ${loginState.isLightModeActive && "menu-container-light"}`}>
      <div
        className='menu-sub-container'
        onClick={() => handleMenuButtonClick()}
      >
        <IoLogOutOutline className='menu-icon' />
        <p>Log In / Sign Up</p>
      </div>

      <div
        className='menu-sub-container'
        onClick={() => dispatch(navigateToRedditAdvertise())}
      >
        <TbPointerHeart className='menu-icon' />
        <p>Advertise on Reddit</p>
      </div>

      <div
        className='menu-sub-container'
        onClick={() => dispatch(navigateToRedditAvatar())}
      >
        <IoBagHandleOutline className='menu-icon' />
        <p>Shop Collectible Avatars</p>
      </div>
    </div>
  )
}
