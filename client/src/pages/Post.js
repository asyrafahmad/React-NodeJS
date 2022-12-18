import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

function Post() {

    let { id } = useParams();
    const [postObject, setPostObject] = useState({});

    useEffect( () => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
            console.log(response)
        })
    })

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='title'>{postObject.title }</div>
                <div className='postText'>{postObject.postText }</div>
                <div className='username '>{postObject.username }</div>
            </div>
            <div className='rightSide'>

            </div>
        </div>
    )
} 

export default Post