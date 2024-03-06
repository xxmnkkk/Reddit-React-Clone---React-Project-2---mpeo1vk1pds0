import React, { useRef, useState } from 'react';
import "../Styles/SigninAndSignupModal.scss";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux'
import {
  handleFormChangeClick,
  handleLoginModalCloseClick,
  handleLoginInput,
  handleSignupInput,
  handleIsLoggedIn,
  handleUserInput
} from "../../../redux/reducers/loginSlice"
import axios from 'axios';

export default function SigninAndSignupModal() {
  const loginState = useSelector((state) => state.loginState);
  const dispatch = useDispatch()

  // State for setting the error message if any occurs during logging in or signing up
  const [error, setError] = useState("");

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  // async function for handling logging in
  const handleLogin = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        projectID: 'f104bi07c490',
      },
    };

    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      appType: 'reddit',
    };

    try {
      const response = await axios.post("https://academics.newtonschool.co/api/v1/user/login", body, config);
      console.log(response.data);

      const loginDetails = {
        name: response.data.data.name,
        email: response.data.data.email
      }
      sessionStorage.setItem("LoggedInUser", JSON.stringify(loginDetails))
      sessionStorage.setItem("token", JSON.stringify(response.data.token))

      dispatch(handleIsLoggedIn())
      dispatch(handleLoginModalCloseClick())
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  // async function for handling signing up
  const handleSignup = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        projectID: 'f104bi07c490',
      },
    };

    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      appType: 'reddit',
    };

    try {
      const response = await axios.post("https://academics.newtonschool.co/api/v1/user/signup", body, config);
      console.log("response: ", response);

      if(response && passwordRef.current.value !== ""){
        dispatch(handleIsLoggedIn())
        dispatch(handleLoginModalCloseClick())
  
        const signUpDetails = {
          name: nameRef.current.value,
          email: emailRef.current.value
        }
  
        localStorage.setItem(`User_${response.data.data.email}`, JSON.stringify(signUpDetails))
        sessionStorage.setItem("LoggedInUser", JSON.stringify(signUpDetails))
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
      }
      else{
        console.log("Please set password");
        setError("Please set the password")
      }
      
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  return (
    // Code for loggin/signup modal which switches up based on the active form state
    <div className='signin-and-signup-modal-layover'>
      {loginState.isActiveForm === "login" ?
        <div className={`signin-and-signup-modal-container ${loginState.isLightModeActive && "signin-and-signup-modal-container-light"}`}>
          <div className='signin-modal-close-logo'>
            <div onClick={() => dispatch(handleLoginModalCloseClick())}>
              <IoCloseOutline className='signin-modal-close' />
            </div>
          </div>

          <div className='signin-modal-texts'>
            <h1>Log In</h1>
            <p>By continuing, you agree to our <span>User Agreement</span> and acknowledge that you understand the <span>Privacy Policy</span>.</p>
          </div>

          <div className='login-input-section'>
            <input
              ref={emailRef}
              type='text'
              placeholder='Email'
              name="email"
            />
            <input
              ref={passwordRef}
              type='text'
              placeholder='Password'
              name="password"
            />
            <p>New to Reddit? <span onClick={() => dispatch(handleFormChangeClick())}>Sign Up</span></p>
          </div>

          <div
            className='login-and-signup-button'
            onClick={() => handleLogin()}
          >
            Log In
          </div>

          <div className='login-error'>{error}</div>
        </div>
        :
        <div className='signin-and-signup-modal-container'>
          <div className='signin-modal-close-logo'>
            <div onClick={() => dispatch(handleLoginModalCloseClick())}>
              <IoCloseOutline className='signin-modal-close' />
            </div>
          </div>

          <div className='signin-modal-texts'>
            <h1>Sign Up</h1>
            <p>By continuing, you agree to our <span>User Agreement</span> and acknowledge that you understand the <span>Privacy Policy</span>.</p>
          </div>

          <div className='login-input-section'>
            <input
              ref={nameRef}
              type='text'
              placeholder='Name'
              name='name'
            />
            <input
              ref={emailRef}
              type='text'
              placeholder='Email'
              name='email'
            />
            <input
              ref={passwordRef}
              type='text'
              placeholder='Password'
              name='password'
            />
            <p>Already a Redditor? <span onClick={() => dispatch(handleFormChangeClick())}>Log In</span></p>
          </div>

          <div
            className='login-and-signup-button'
            onClick={() => handleSignup()}
          >
            Sign Up
          </div>

          <span>{error}</span>
        </div>
      }
    </div>
  )
}
