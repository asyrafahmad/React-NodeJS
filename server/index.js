const express =  require('express')

const app = express()
const cors = require("cors")

// database
const db = require('./models')

// Cors
app.use(cors())

// Routers
app.use(express.json())
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter)


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001")
    });
}).catch(error => console.log(error))

