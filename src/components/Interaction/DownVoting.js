import React, { useEffect } from 'react'
import axios from 'axios';

export default function DownVoting(postId) {
    useEffect(() => {
        const token = JSON.stringify(sessionStorage.getItem("token"));

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                projectID: "f104bi07c490"
            }
        }
        axios.delete(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}` , config)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
}