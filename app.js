require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose');
//через mongoose здійснюються запити на mongo
//з mongo вертається екземпляр класу document(з хламом), хов в консолі того не покаже

mongoose.connect('mongodb://localhost:27017/dec');

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true})) //без того буде бачити пустий об'єкт(в консолі: {})

app.use('/auth', authRouter);
app.use('/users', userRouter);

//всі ерори злітаються сюди:
app.use((err, req,res,next)=>{
    res
        .status(err.status || 500)
        .json({
            error:err.message || 'Unknown error',
            code:err.status || 400
        })
})

app.use('*', (req, res)=>{
    res.status(404).json('Route not found')
})

app.listen(5000,()=>{
  console.log(  `Server listen port 5000`)})

// app.get('/users', userController.getUsers)
// app.get('/users/:id',userController.getUser)
// app.post('/users',userController.postUser)
// app.delete('/users/:id',userController.deleteUser)
// app.put('/users/:id',userController.updateUser)
