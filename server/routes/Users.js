const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')

// Create user (registration)
router.post("/", async (req,res) => {
   const {username, password} = req.body
   await bcrypt.hash(password, 10).then((hash) => {
       Users.create({
         username:username,
         password: hash
      });
      res.json("Successfully create new user! ")
   })

   // await Users.create({
   //      username: username,
   //      password: bcrypt.hash(password, 10).then((hash) => {
   //          return hash
   //      })
   // })
})

// Login Validation
router.post('/login', async (req, res) => {
   const {username,password} = req.body

   const user = await Users.findOne( {where: {username: username}})

   if(!user) res.json({error: "User doesn't exist"})

   bcrypt.compare(password, user.password).then((match) => {
      if(!match) res.json({error: "Wrong username and password combination"})

      res.json("You Logged In")
   })
})

module.exports = router