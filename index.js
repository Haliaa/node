const express = require("express");
const mongoose = require("mongoose");
const expressFileUpload = require('express-fileupload');
const path = require("path");
require('dotenv').config({path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)})

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const {PORT,MONGO_URL} = require('./configs/configs');

mongoose.connect(MONGO_URL)

const app = express();
app.use(express.json())
// app.use(express.urlencoded({extended:true}))

app.use(expressFileUpload());
app.use('/ping', (req, res)=>res.json('pong'))
app.use('/auth', authRouter)
app.use('/users', userRouter)


//всі ерори злітаються сюди:
app.use((err, req,res,next)=>{
    res
        .status(err.status || 400)
        .json({
            error:err.message || 'Unknown error',
            code:err.status || 400
        })
})

app.use('*', (req, res)=>{
    res.status(404).json('Route not found')
})


app.listen(PORT, () => {
    console.log(`Service is listening port ${PORT}`)
})
