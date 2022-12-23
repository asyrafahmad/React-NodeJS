import React from 'react'
import axios from "axios"; 
import {useEffect, useState} from "react"; 
import { useNavigate } from 'react-router-dom'

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(
            "http://localhost:3001/posts"
        ).then((response) => {
            setListOfPosts(response.data);
        }).catch((error) => {
            console.log("ERROR ! Get all post")
        })
    }, [])

    const likeAPost = (postId) => {
        axios.post(
            "http://localhost:3001/likes",
            { PostId: postId} ,
            { headers: {
                accessToken: localStorage.getItem("accessToken")
            }}
        ).then((response) => {
            alert(response.data)
            setListOfPosts(listOfPosts.map((post) => {
                if(post.id === postId) {
                    return {...post, Likes: [post.Likes, 0] }   // already liked
                } else {
                    const likesArray = post.Likes;
                    likesArray.pop()
                    return {...post, Likes: likesArray }        // remove like in last array
                }
            }))
        }).catch((error) => {
            console.log("ERROR ! To like the post")
        })
    }

  return (
    <div>
        {listOfPosts.map((value,key) => {
            return (
                <div key={key} className="post" > 
                    <div className="title"> {value.title} </div>
                    <div className="body" onClick={ () => {navigate(`/post/${value.id}`)} }> {value.postText} </div>
                    <div className="footer">
                        {value.username}{" "}
                        <button onClick={ () => {likeAPost(value.id)}}> {" "}Like</button> 
                        <label> {value.Likes.length} </label>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Home
 