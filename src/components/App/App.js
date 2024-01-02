import "../App/Styles/App.scss";
import NavBar from "../NavBar/NavBar.js";
import { Route, Routes } from 'react-router-dom';
import HomePage from "../HomePage/HomePage.js";
import SubReddit from "../Subreddit/SubReddit.js";
import SearchedUser from "../Subreddit/SearchedUser.js"
import { useEffect } from "react";
import { handleIsLoggedIn } from "../../redux/reducers/loginSlice.js";
import { useDispatch } from "react-redux";
import CreatePost from "../Subreddit/CreatePost.js";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("token")
    if(userLoggedIn){
      dispatch(handleIsLoggedIn())
    }
  })
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/searchedUser/:subredditName" element={<SearchedUser />}/>
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </>
  )
}

export default App;
