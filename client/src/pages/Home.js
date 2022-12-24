import React from 'react'
import axios from "axios"; 
import {useEffect, useState} from "react"; 
import { useNavigate } from 'react-router-dom'

/* import icon */
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

function Home() {

    const [viewListOfPosts, setListOfPosts] = useState([]);
    const [viewLikedPosts, setLikedPosts] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        axios
        .get("http://localhost:3001/posts", { 
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            setListOfPosts(response.data.listOfPosts);
            setLikedPosts(response.data.likedPosts.map((like) => {return like.PostId}));
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
            setListOfPosts(viewListOfPosts.map((post) => {
                if(post.id === postId) {
                    if (response.data.liked){
                        return {...post, Likes: [post.Likes, 0] }   // already liked
                    } else {
                        const likesArray = post.Likes;
                        likesArray.pop()
                        return {...post, Likes: likesArray }        // remove like in last array
                    }
                } else {
                   return post
                }
            }))
        }).catch((error) => {
            console.log("ERROR ! To like the post")
        })

        if (viewLikedPosts.includes(postId)) {          // remove like
            setLikedPosts(
                viewLikedPosts.filter((id) => {
                    return id !== postId
                })
            )
        } else {                                        // add like 
            setLikedPosts([...viewLikedPosts, postId])
        }
    }

  return (
    <div>
        {viewListOfPosts.map((value,key) => {
            return (
                <div key={key} className="post" > <br/>
                    <div className="title"> Comment Title : {value.title} </div>
                    <div className="body" onClick={ () => {navigate(`/post/${value.id}`)} }> Comment Text : {value.postText} </div>
                    <div className="footer">
                        Comment by : {value.username} {" "}
                        <ThumbUpAltIcon 
                            onClick={ () => {likeAPost(value.id)}} 
                            // className = { likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                        />
                        <label> {value.Likes.length} </label>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Home
 