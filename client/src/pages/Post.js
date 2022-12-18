import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

function Post() {

    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const[newComment, setNewComment] = useState("")

    useEffect( () => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
            console.log(response)
        })
        
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
            console.log(response)
        })
    }, []);

    const addComment = () => {
        axios
        .post(
            "http://localhost:3001/comments", {
                commentBody: newComment,
                PostId: id})
        .then((response) => {
            const commentToAdd = {commentBody: newComment}
            setComments([...comments, commentToAdd])
            setNewComment("")
            console.log('Comment is added.')
        });
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='title'>{postObject.title}</div>
                <div className='postText'>{postObject.postText }</div>
                <div className='username'>{postObject.username }</div>
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
                        return <div key={key} className='comment'> {comment.commentBody}</div>
                    })}
                </div>
            </div>
        </div>
    )
} 

export default Post
