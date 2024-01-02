import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Subreddit() {
    const searchState = useSelector((state) => state.searchState)
    console.log("searched data: ", searchState.searchedData);
    // const channelId = searchState.searchedData.data[0].channel._id;

    // useEffect(() => {
    //     const token = sessionStorage.getItem("token")
    //     const config = {
    //         headers: {
    //             Authorization: token,
    //             projectID: "f104bi07c490"
    //         }
    //     }

    //     axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel/${channelId}/posts`, config)
    //         .then((response) => {
    //             console.log("channel",response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         })
    // }, [channelId])
    return (
        <div>subreddit</div>
    )
}
