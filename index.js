const express = require("express");
const userRouter = require('./routes/user.router')

const app = express();

app.use(express.json())
// app.use(express.urlencoded({extended:true}))

app.use('/users', userRouter)
app.use('*', (req, res)=>{
    res.status(404).json('Page not found')
})


app.listen(5000, () => {
    console.log('Service is listening port 5000')
})
