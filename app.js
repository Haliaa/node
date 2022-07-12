const express = require("express")
const userRouter = require('./routes/user.router')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true})) //без того буде бачити пустий об'єкт(в консолі: {})

app.use('/users', userRouter)

app.use('*', (req, res)=>{
    res.status(404).json('Route not found')
})

app.listen(5000)

// app.get('/users', userController.getUsers)
// app.get('/users/:id',userController.getUser)
// app.post('/users',userController.postUser)
// app.delete('/users/:id',userController.deleteUser)
// app.put('/users/:id',userController.updateUser)
