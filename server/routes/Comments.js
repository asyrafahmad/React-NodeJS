const express = require('express')
const router = express.Router()
const { Comments } = require('../models')
const { validateToken } = require("../middlewares/AuthMiddleware")

/* Get post by ID */
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    const comments = await Comments.findAll({
        where: { PostId: postId}
    });
    res.json(comments);
})

/* Create Comment */
router.post("/", validateToken, async (req,res) => {

    // const comment = req.body
    const { commentBody, PostId } = req.body
    const username = req.user.validToken.username

    // comment.username = username
    // await Comments.create(comment)
    const createComment = await Comments.create({commentBody:commentBody, PostId:PostId, username:username})

    // res.json(comment)  
    res.json(createComment)  
})

/* Delete Comment */
router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId
    console.log(commentId)
    const deleteComment = await Comments.destroy({ where: {
        id: commentId,
    }})

    res.json(deleteComment)
})

module.exports = router