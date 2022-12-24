const express = require('express')
const router = express.Router()
const { Likes } = require('../models')
const { validateToken } = require("../middlewares/AuthMiddleware")

router.post("/", validateToken, async (req, res) => {
    
    console.log('asaa')
    const { PostId } = req.body
    const UserId = req.user.validToken.id

    const found = await Likes.findOne({where: {PostId: PostId, UserId: UserId}})            // get specific user with condition (PostId, UserId)

    if (!found) {       // like comment
        await Likes.create({PostId: PostId, UserId: UserId})
        res.json({liked : true})
    } else {            // unlike comment
        await Likes.destroy({
            where: {
                PostId: PostId,
                UserId: UserId
            }
        })
        res.json({liked : false})
    }

})


module.exports = router