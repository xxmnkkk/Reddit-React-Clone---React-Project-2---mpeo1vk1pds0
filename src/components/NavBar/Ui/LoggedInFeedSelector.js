import React, { useEffect } from 'react'
import '../Styles/LoggedInFeedSelector.scss'

import { useDispatch, useSelector } from 'react-redux';
import { setIndex, setSelectedFeed1, setFeedModal } from '../../../redux/reducers/feedSelectorSlice'
import { setSelectedFeed } from '../../../redux/reducers/homePageSlice';
import { handleMessagesClick, handleIsNotificationActive, handleCreateCommunityClick } from "../../../redux/reducers/loginSlice"
import { navigateToRedditPremium, navigateToRedditAvatar } from "../../../redux/reducers/externalWebsiteSlice"

import { AiFillHome } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgArrowTopRightO } from "react-icons/cg";
import { TiWorldOutline } from "react-icons/ti";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { IoAdd, IoNotificationsOutline } from "react-icons/io5";
import { TbPremiumRights } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

export default function LoggedInFeedSelector() {
  const feedSelectorState = useSelector(state => state.feedSelectorState);
  const loginState = useSelector((state) => state.loginState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedOption = [
    {
      icon: <AiFillHome className={`feed-icon ${feedSelectorState.isFeedModalVisible ? "feed-modal-active-2" : ""}`} />,
      text: "Home",
      dropdown: <RiArrowDropDownLine className={`dropdown ${feedSelectorState.isFeedModalVisible ? "feed-modal-active-2" : ""}`} />
    },
    {
      icon: <CgArrowTopRightO className={`feed-icon ${feedSelectorState.isFeedModalVisible ? "feed-modal-active-2" : ""}`} />,
      text: "Popular",
      dropdown: <RiArrowDropDownLine className={`dropdown ${feedSelectorState.isFeedModalVisible ? "feed-modal-active-2" : ""}`} />
    },
    {
      icon: <TiWorldOutline className={`feed-icon ${feedSelectorState.isFeedModalVisible ? "feed-modal-active-2" : ""}`} />,
      text: "All",
      dropdown: <RiArrowDropDownLine className={`dropdown ${feedSelectorState.isFeedModalVisible ? "feed-modal-active-2" : ""}`} />
    }
  ]

  const index = feedSelectorState.index;
  const selectedFeedOption = selectedOption[index];

  const handleFeedChange = (index, selectedFeed) => {
    dispatch(setIndex(index));
    dispatch(setSelectedFeed1(selectedFeed));

    if (selectedFeed === 'Home') {
      dispatch(setSelectedFeed('home'));
    } else if (selectedFeed === 'Popular') {
      dispatch(setSelectedFeed('popular'));
    }
  };

  useEffect(() => {
    if (feedSelectorState.selectedFeed === 'Home') {
      dispatch(setSelectedFeed('home'));
    } else if (feedSelectorState.selectedFeed === 'Popular') {
      dispatch(setSelectedFeed('popular'));
    }
  }, [feedSelectorState.selectedFeed, dispatch]);

  // function handleCreateCommunityClick() {
  //   dispatch(handleCreateCommunityClick())
  //   dispatch(setFeedModal())
  // }

  return (
    <div className={`loggedin-feed-selector-container ${loginState.isLightModeActive && "loggedin-feed-selector-container-light"}`}>
      <div className={`auth-navbar-container ${feedSelectorState.isFeedModalVisible ? "feed-modal-active" : ""}`} onClick={() => dispatch(setFeedModal())}>
        <div>
          {selectedFeedOption.icon}
          <span>{selectedFeedOption.text}</span>
        </div>
        {selectedFeedOption.dropdown}
      </div>

      {feedSelectorState.isFeedModalVisible &&
        <div className="feed-selector-modal-container">
          <div
            className='feed-create-community'
            onClick={() => {
              dispatch(handleCreateCommunityClick())
              dispatch(setFeedModal())
            }}
          >
            <IoAdd className='logged-feed-icon' />
            Create community
          </div>
          <span>FEEDS</span>
          {selectedOption.map((feed, index) => (
            <div
              key={index}
              className={`feed-selector-container feed-container-one ${index === 2 && "all"}`}
              onClick={() => {
                if (loginState.currentLocation !== "/") {
                  navigate("/")
                  dispatch(setSelectedFeed(feed.text.toLowerCase()));
                  dispatch(setIndex(index));
                  dispatch(setFeedModal())
                }
                else {
                  dispatch(setSelectedFeed(feed.text.toLowerCase()));
                  handleFeedChange(index, feed.text.toLowerCase())
                }
              }}
            >
              {feed.icon}
              {feed.text}
            </div>
          ))}

          <span>OTHER</span>
          <div className='feed-selector-other-container'>
            <div className='feed-selector-container feed-selector-container-usersetting'>
              <RiUserSettingsLine className='other-icon' />
              User Settings
            </div>

            <div
              className='feed-selector-container'
              onClick={() => dispatch(handleMessagesClick())}
            >
              <AiOutlineMessage className='other-icon' />
              Messages
            </div>

            <div
              className='feed-selector-container'
              onClick={() => {
                navigate("/createpost")
                dispatch(setFeedModal())
              }}
            >
              <IoAdd className='other-icon' />
              Create Post
            </div>

            <div
              className='feed-selector-container'
              onClick={() => dispatch(handleIsNotificationActive())}
            >
              <IoNotificationsOutline className='other-icon' />
              Notifications
            </div>

            <div
              className='feed-selector-container'
              onClick={() => dispatch(navigateToRedditPremium())}
            >
              <TbPremiumRights className='other-icon' />
              Premium
            </div>

            <div
              className='feed-selector-container'
              onClick={() => dispatch(navigateToRedditAvatar())}
            >
              <GiClothes className='other-icon' />
              Avatar
            </div>
          </div>
        </div>
      }
    </div>
  )
}
