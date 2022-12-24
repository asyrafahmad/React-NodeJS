const express = require('express')
const router = express.Router()
const { Posts, Likes } = require('../models')
const { validateToken } = require("../middlewares/AuthMiddleware")

router.get("/", validateToken, async (req,res) => {
    try {
        const listOfPosts = await Posts.findAll({include: [Likes] })            // get All Post Associate with Likes model 
        const likedPosts = await Likes.findAll({where: { UserId: req.user.validToken.id}})

        res.json({listOfPosts: listOfPosts, likedPosts: likedPosts})
    } catch (error) {
        console.log({error: error, message: "ERROR ! List of posts"})
    }
})

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
   
    try {
        const post = await Posts.findByPk(id)
        res.json(post);
    } catch (error) {
        console.log({error: error, message: "ERROR ! Post by ID"})
    }
})
 
router.post("/", async (req,res) => {
    const post = req.body
    
    try {
        await Posts.create(post)
        res.json(post)  
    } catch (error) {
        console.log({error: error, message: "ERROR ! Create new post"})
    }
})

module.exports = router