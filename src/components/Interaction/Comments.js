import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setComments } from '../../redux/reducers/homePageSlice';

export default function Comments(postId) {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = JSON.stringify(sessionStorage.getItem("token"));

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                projectID: "f104bi07c490"
            }
        }
        axios.get(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments` , config)
        .then((response) => {
            dispatch(setComments(response.data))
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
}