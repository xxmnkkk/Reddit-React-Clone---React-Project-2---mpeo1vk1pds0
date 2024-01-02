import React, { useEffect } from 'react'
import axios from 'axios';

export default function PostComment(postId , comment) {
    useEffect(() => {
        const token = JSON.stringify(sessionStorage.getItem("token"));

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                projectID: "f104bi07c490"
            },
            body: {
                content: comment
            }
        }
        axios.post(`https://academics.newtonschool.co/api/v1/reddit/comment/${postId}` , config)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
}