import "../App/Styles/App.scss";
import NavBar from "../NavBar/NavBar.js";
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from "../HomePage/HomePage.js";
import SearchedUser from "../Subreddit/SearchedUser.js"
import { useEffect } from "react";
import { handleIsLoggedIn , setCurrentLocation} from "../../redux/reducers/loginSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../Subreddit/CreatePost.js";
import SubredditPage from "../HomePage/Ui/SubredditPage.js";

function App() {
  // This is the App component, this is where all the magic starts to happen

  const loginState = useSelector((state) => state.loginState)
  const dispatch = useDispatch()

  // Getting the current location and setting it so that i can navigate back to home-page/popular-page 
  const currentLocation = useLocation();
  console.log("Current Location: ", currentLocation.pathname);

  useEffect(() => {
    dispatch(setCurrentLocation(currentLocation.pathname))
  }, [currentLocation.pathname])

  // Setting if the user is logged in. session storage method is adopted so that when i reload the page the user does not log out.
  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("token")
    if(userLoggedIn){
      dispatch(handleIsLoggedIn())
    }
  }, [])

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/searchedUser/:subredditName" element={<SearchedUser />}/>
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/subreddit" element={<SubredditPage />}/>
      </Routes>
    </>
  )
}

export default App;
