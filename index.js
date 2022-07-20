const express = require("express");
const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const mongoose = require("mongoose");

const app = express();

app.use(express.json())
// app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/dec')


app.use('/users', userRouter)
app.use('/auth', authRouter)

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


app.listen(5000, () => {
    console.log('Service is listening port 5000')
})
