import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../helpers/AuthContext'

function Post() {

    let { id } = useParams();

    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("")

    const { authState } = useContext(AuthContext)

    // console.log(authState)

    useEffect( () => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
            // console.log(response)
        })
        
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
            // console.log(response)
        })
    }, [id]);

    // TODO: check cannot add comment
    const addComment = () => {
        axios
        .post("http://localhost:3001/comments",
            {
                commentBody: newComment, 
                PostId: id
            }, 
            { 
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        )
        .then((response) => {
            if (response.data.error) {
                console.log(response.data.error)
            }else {
                const commentToAdd = {commentBody: newComment, username: response.data.username} 
                setComments([...comments, commentToAdd])
                setNewComment("")
                console.log(response)
                console.log('Comment is added.')
            }
          
        })
        .catch((error) => {
            console.log(error)
            console.log("Failed ! To Add Comment")
        })
    }

    const deleteComment = (id) => {
        axios
        .delete(`http://localhost:3001/comments/${id}`,  { 
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        .then(() => {
            console.log('sd')
            setComments(comments.filter((val) => {
                return val.id != id;
            }))
            alert("Delete comment success!")
        })
        .catch((error) => {
            console.log("Failed ! Delete comment")
        })
    }

    const deletePost = (id) => {
        axios
        .delete(`http://localhost:3001/posts/${id}`, { 
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        } )
        .then(() => {
            alert("Delete post success!")
        })
    }
    
    return (
        <div className='postPage'>
            <div className='leftSide'><br/>
                <div className='title'>{postObject.title}</div>
                <div className='postText'>{postObject.postText }</div>
                <div className='username'>{postObject.username }</div>
                <div>
                    {authState.username === postObject.username && (
                    <button onClick={() => {deletePost(postObject.id)}}> Delete Post</button>
                    )}
                </div>
            </div>
            <br/>
            <br/>
            <div className='rightSide'>
                <div className="addCommentContainer">
                    <input type="text" placeholder="Comment..." autoComplete='off' value={newComment} onChange={(event) => {setNewComment(event.target.value)}} />
                    <br/>
                    <button onClick={addComment}>Add Comment </button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'> 
                                {comment.commentBody} 
                                <br/>
                                <br/>
                                <label> Comment by Username: {comment.username}</label>
                                {authState.username === comment.username && (<button onClick={() => {deleteComment(comment.id)}}>Delete</button>)}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
} 

export default Post
