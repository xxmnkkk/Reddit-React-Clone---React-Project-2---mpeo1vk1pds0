import React, { useEffect } from 'react'
import axios from 'axios';

function UpVoting({postId}) {
    useEffect(() => {
        const token = JSON.stringify(sessionStorage.getItem("token"));

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                projectID: "f104bi07c490"
            }
        }
        axios.post(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}` , config)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [postId])

    return null
}

export default UpVoting
