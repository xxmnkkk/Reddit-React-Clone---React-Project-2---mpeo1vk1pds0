import React, { useRef, useState, useEffect } from 'react'
import "../styles/commentModal.scss"
import { useDispatch, useSelector } from 'react-redux'
import { updateComments } from "../../../redux/reducers/homePageSlice"

import { ImBold, ImItalic } from "react-icons/im";
import { IoIosLink, IoIosMenu } from "react-icons/io";
import { GoStrikethrough } from "react-icons/go";
import { PiArrowsInLineHorizontalDuotone, PiWarningDiamond } from "react-icons/pi";
import { BsSuperscript, BsCardHeading } from "react-icons/bs";

export default function CommentModal() {
  const homePageState = useSelector((state) => state.homePageState)
  const dispatch = useDispatch();
  const commentRef = useRef();
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    setLocalComments(homePageState.comments);
  }, [homePageState.comments]);

  const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));
  const user = loggedInUser.name;

  const postId = homePageState.comments.length > 0 ? homePageState.comments[0].post : null;
  const token = sessionStorage.getItem("token")
  const trimmedToken = token ? token.slice(1, -1) : null;

  const handleCommentPost = () => {
    const newComment = { author: user, content: commentRef.current.value, children: [] };

    setLocalComments(prevComments => [...prevComments, newComment]);

    fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${trimmedToken}`,
        'projectID': 'f104bi07c490',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'content': commentRef.current.value
      }),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateComments(data));
        console.log('Comment posted successfully:', data);
      })
      .catch(error => {
        console.error('Error posting comment:', error);
      });
  }

  const handleDeleteComment = (commentId) => {
    setLocalComments(prevComments => prevComments.filter(comment => comment._id !== commentId));

    fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${trimmedToken}`,
        'projectID': 'f104bi07c490',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateComments(data));
        console.log('Comment deleted successfully:', data);
      })
      .catch(error => {
        console.error('Error deleted comment:', error);
      });
  }


  return (
    <div className='comment-container'>
      <div className='comment-username'>
        Comment as <span>{user}</span>
      </div>

      <div className='post-comment-container'>
        <textarea typeof='text' placeholder='What are your thoughts?' ref={commentRef} />
        <div className='postcomment-icon-container'>
          <div className='post-icon-container'>
            <ImBold className='postcomment-icon' />
            <ImItalic className='postcomment-icon' />
            <IoIosLink className='postcomment-icon' />
            <GoStrikethrough className='postcomment-icon' />
            <PiArrowsInLineHorizontalDuotone className='postcomment-icon' />
            <BsSuperscript className='postcomment-icon' />
            <PiWarningDiamond className='postcomment-icon' />
            <BsCardHeading className='postcomment-icon' />
            <IoIosMenu className='postcomment-icon' />
          </div>
          <div className='postcomment-text'>
            <p>Markdown mode</p>
            <div
              className='postcomment-button'
              onClick={() => handleCommentPost()}
            >
              Comment
            </div>
          </div>
        </div>
      </div>

      {localComments.map((data, index) => (
        <div className='otheruser-comment-container' key={index}>
          <div className='reddit-comment-author-name'>redditUser{data.author.slice(0, 6)}</div>
          <div className='reddit-comment-1'>
            <p>{data.content}</p>
            <div
              className='comment-delete'
              onClick={() => handleDeleteComment(data._id)}
            >
              Delete Comment
            </div>

            {data.children.length > 0 &&
              data.children.map((data, index) => (
                <div
                  key={index}
                  className='reddit-comment-children'
                >
                  <div className='reddit-comment-author-name'>redditChildUser{data.author.slice(0, 6)}</div>
                  <div className='reddit-comment-1'>
                    <p>{data.content}</p>

                    <div
                      className='comment-delete'
                      onClick={() => handleDeleteComment(data._id)}
                    >
                      Delete Comment
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  )
}
