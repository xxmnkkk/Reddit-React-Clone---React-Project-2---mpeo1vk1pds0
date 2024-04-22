import React, { useState } from 'react'
import "../styles/subredditPage.scss"
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux'
import {
  setSubredditData,
  setSubredditUserData
} from "../../../redux/reducers/searchedUserSlice"

import subredditBackgroundImage from "../../../Assets/images/subreddit-background-image.jpg"
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { GoComment } from "react-icons/go";
import { FiShare } from "react-icons/fi";
import { LuCakeSlice } from "react-icons/lu";

// Just an array of objects with color information to set in respective section
const backgroundSkillsColor = [
  {
    backgroundColor: "orange"
  },
  {
    backgroundColor: "yellow"
  },
  {
    backgroundColor: "green"
  },
  {
    backgroundColor: "red"
  },
  {
    backgroundColor: "blue"
  },
  {
    backgroundColor: "grey"
  },
  {
    backgroundColor: "purple"
  },
  {
    backgroundColor: "pink"
  },
  {
    backgroundColor: "violet"
  },
  {
    backgroundColor: "white"
  },
]


export default function SubredditPage() {
  const searchedUserState = useSelector((state) => state.searchedUserState);
  const homepageState = useSelector((state) => state.homepageState)
  const dispatch = useDispatch();

  const [joined, setJoined] = useState(false)

  const channelId = searchedUserState.subredditUserId;
  const token = sessionStorage.getItem("token")
  const trimmedToken = token ? token.slice(1, -1) : null;

  // console.log("Popular community id: ", channelId);

  React.useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${trimmedToken}`,
        projectID: "f104bi07c490"
      }
    }

    // Calling the api for getting the posts data for respective subreddit page
    axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel/${channelId}/posts`, config)
      .then((response) => {
        dispatch(setSubredditData(response.data.data));
        console.log("Popular community Data: ", response);
      })
      .then((error) => {
        console.log(error);
      })

    // Calling the api for getting the subreddit pages details 
    axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel/${channelId}`, config)
      .then((response) => {
        // console.log(response.data.data);
        dispatch(setSubredditUserData(response.data.data));
        console.log("Popular community user Data: ", response);
      })
      .then((error) => {
        console.log(error);
      })
  }, [])

  const subredditData = searchedUserState.subredditData;
  const subredditUserData = searchedUserState.subredditUserData

  console.log("subredditData: ", subredditData);
  // console.log("Popular community user Data: ", subredditUserData);

  return (
    <div className='subreddit-main-container'>
      <div className='subreddit-image-section'>
        <div className='subreddit-header-image'>
          <img src={subredditBackgroundImage} />
        </div>

        <div className='subreddit-join-section'>
          <img src={subredditUserData?.owner?.profileImage} />

          <div className='subreddit-name-container'>
            <h2>{subredditUserData.name}</h2>
            <p>u/{subredditUserData?.owner?.name}</p>
          </div>

          <div
            className='subreddit-join-button'
            onClick={() => setJoined(!joined)}
          >{joined ? "Joined" : "Join"}</div>
        </div>
      </div>

      <div className='subreddit-posts-and-details-container'>
        <div className='subreddit-post-container'>
          {subredditData && subredditData.map((data, index) => (
            <>
              <div key={index} className='subreddit-post'>
                <span>Posted by u/{subredditUserData?.owner?.name}</span>
                <h2>{data?.title}</h2>
                <p>{data?.content}</p>

                <div className='post-interaction-container'>
                  <div className='post-interaction-subcont'>
                    <TiArrowUpOutline
                      className='post-interaction-icon subreddit-useless-icon'
                    />
                    {data?.likeCount}
                    <TiArrowDownOutline
                      className='post-interaction-icon subreddit-useless-icon'
                    />
                  </div>
                  <div
                    className='post-interaction-subcont post-curse subreddit-useless-icon'
                  >
                    <GoComment className='post-interaction-icon-1' />
                    {data?.commentCount}
                  </div>
                  <div className='post-interaction-subcont post-curse subreddit-useless-icon'>
                    <FiShare className='post-interaction-icon-1 ' />
                    Share
                  </div>
                </div>
              </div>

              <hr />

            </>
          ))}

          {subredditData.length === 0 && <div className='subreddit-no-data' >No posts found for this subreddit page</div>}
        </div>

        <div className='subreddit-details-container'>
          <div className='subreddit-details-description'>
            <span>About Community</span>
            <p>{subredditUserData.description}</p>
            <div><LuCakeSlice className='cake-icon' /> Created {subredditUserData?.createdAt?.slice(0, 10)}</div>
          </div>

          <div className='subreddit-skills-description'>
            <span>Skills</span>
            {subredditUserData && subredditUserData?.owner?.skills?.map((data, index) => (
              <div
                className='skills-bubble'
                key={index}
                style={{ backgroundColor: backgroundSkillsColor[index % backgroundSkillsColor.length].backgroundColor }}
              >
                #{data}
              </div>
            ))}
          </div>

          <div className='subreddit-owner-details'>
            <span>Owner Details</span>
            <div className='owner-detail-line'>
              <span>Name: </span>
              <p>{subredditUserData?.owner?.name || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>Email: </span>
              <p>{subredditUserData?.owner?.email || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>Phone: </span>
              <p>{subredditUserData?.owner?.phone || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>Gender: </span>
              <p>{subredditUserData?.owner?.gender || "N/A"}</p>
            </div>
          </div>

          <div className='subreddit-owner-details'>
            <span>Address Details</span>
            <div className='owner-detail-line'>
              <span>City: </span>
              <p>{subredditUserData?.owner?.address[0]?.city || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>Country: </span>
              <p>{subredditUserData?.owner?.address[0]?.country || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>State: </span>
              <p>{subredditUserData?.owner?.address[0]?.state || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>Street: </span>
              <p>{subredditUserData?.owner?.address[0]?.street || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>Zip Code: </span>
              <p>{subredditUserData?.owner?.address[0]?.zipCode || "N/A"}</p>
            </div>
          </div>

          <div className='subreddit-owner-details'>
            <span>Education Details</span>
            <div className='owner-detail-line'>
              <span>Degree: </span>
              <p>{subredditUserData?.owner?.education[0]?.degree || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>Description: </span>
              <p>{subredditUserData?.owner?.education[0]?.description || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>School name: </span>
              <p>{subredditUserData?.owner?.education[0]?.schoolName || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>Start date: </span>
              <p>{subredditUserData?.owner?.education[0]?.startDate?.slice(0, 10) || "N/A"}</p>
            </div>
            <div className='owner-detail-line'>
              <span>End date: </span>
              <p>{subredditUserData?.owner?.education[0]?.endDate?.slice(0, 10) || "N/A"}</p>
            </div>
          </div>

          {subredditUserData?.owner?.paymentDetails?.length > 0 &&
            <div className='subreddit-owner-details'>
              <span>Support Us</span>
              <div className='owner-detail-line'>
                <span>Acc Number: </span>
                <p>{subredditUserData?.owner?.paymentDetails[0]?.cardNumber || "N/A"}</p>
              </div>
              <div className='owner-detail-line'>
                <span>IFSC Code: </span>
                <p>{subredditUserData?.owner?.paymentDetails[0]?.cvv || "N/A"}</p>
              </div>
            </div>
          }

          {subredditUserData?.owner?.workExperience?.length > 0 &&
            <div className='subreddit-owner-details'>
              <span>Experience Details</span>
              <div className='owner-detail-line'>
                <span>Company: </span>
                <p>{subredditUserData?.owner?.workExperience[0]?.companyName || "N/A"}</p>
              </div>
              <div className='owner-detail-line'>
                <span>Description: </span>
                <p>{subredditUserData?.owner?.workExperience[0]?.description || "N/A"}</p>
              </div>
              <div className='owner-detail-line'>
                <span>Designation: </span>
                <p>{subredditUserData?.owner?.workExperience[0]?.designation || "N/A"}</p>
              </div>
              <div className='owner-detail-line'>
                <span>Location: </span>
                <p>{subredditUserData?.owner?.workExperience[0]?.location || "N/A"}</p>
              </div>
              <div className='owner-detail-line'>
                <span>End date: </span>
                <p>{subredditUserData?.owner?.workExperience[0]?.startDate?.slice(0, 10) || "N/A"}</p>
              </div>
            </div>
          }

          {/* <div className='subreddit-owner-details'>
            <img src='https://styles.redditmedia.com/t5_3d4x4/styles/image_widget_5r1kkbeoudx91.jpg?format=pjpg&s=34cbbfb7a26a83189a7facd9c5ab5fae68573ce8' />
          </div>

          <div className='subreddit-owner-details'>
            <img src='https://styles.redditmedia.com/t5_3d4x4/styles/image_widget_acyohw4vzb151.png' />
          </div>

          <div className='subreddit-owner-details'>
            <img src='https://styles.redditmedia.com/t5_3d4x4/styles/image_widget_b22let7yzb151.png' />
          </div>

          <div className='subreddit-owner-details'>
            <img src='https://styles.redditmedia.com/t5_3d4x4/styles/image_widget_rwbui2830c151.png' />
          </div>

          <div className='subreddit-owner-details'>
            <img src='https://styles.redditmedia.com/t5_3d4x4/styles/image_widget_a31virasmb151.png' />
          </div>

          <div className='subreddit-owner-details'>
            <img src='https://styles.redditmedia.com/t5_3d4x4/styles/image_widget_76k3ejjrvdo61.png' />
          </div>

          <div className='subreddit-owner-details'>
            <img src='https://styles.redditmedia.com/t5_3d4x4/styles/image_widget_akx0e6j8ber61.png' />
          </div>

          <div className='subreddit-owner-details'>
            <img src='https://styles.redditmedia.com/t5_3d4x4/styles/image_widget_4jrgtyhb9n2a1.jpg?format=pjpg&s=f21bfe81f071d070202ecd8d6fdbbd2feb31ffa7' />
          </div> */}
        </div>
      </div>
    </div>
  )
}
