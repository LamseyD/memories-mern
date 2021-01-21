import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import dotenv from 'dotenv'

import postRoutes from './route/posts.js'
import userRoutes from './route/users.js'
const app = express();

dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.get('/', (req,res) => {
    res.send('Hello to memories API')
})

app.use('/posts', postRoutes);
app.use('/user', userRoutes)
//use npm i dotenv to hide secrets, .env files can only be seen on your pc
const PORT = process.env.PORT || 3001

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})
    }).catch((error) => {
        console.log(error.message)
    })

mongoose.set('useFindAndModify', false);