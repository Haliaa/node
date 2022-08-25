// sentry.io //app total tacker/monitoring

//https://crontab.guru/#00_9_1-15_*_3
//планування часу (не відштовхуючись від запуску проекту як в setInterval)
//встановлення певної дії на заплановане число

//cron-job-manager - A node-cron wrapper that manages many jobs at once.

// "dev": "node xx.js && echo HELLO GUYS && pm2 start app.js --name mainServer --watch --attach"
// echo-виводить в консоль

//cors можна обійти якшо слати Origin і як значення урлу з whitelist (exp. http://localhost:3000) в Headers  (в postman-і  наприклад)

require('dotenv').config()

const express = require('express')
const http = require('http')
const expressFileUpload = require('express-fileupload')
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');

mongoose.connect('mongodb://localhost:27017/dec');

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const {NODE_ENV, CORS_WHITE_LIST} = require("./constants/config");
const cronRun = require("./cron");
const swaggerJson = require("./swagger.json");

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {cors: 'http://localhost:63342'});
io.on('connection', (socket) => {
    console.log('_____________')
    console.log(socket.handshake.query)
    console.log(socket.handshake.auth)
    console.log('_____________')

    socket.emit('connectSuccess', {hello: 'World'})

    socket.on('sendMessage', (messageData) => {
        console.log('Socket ', socket.id, 'with auth token ', socket.handshake.auth.token, 'send message ', messageData)

        //emit to all users except sender
        socket.broadcast.emit('message:received', {
            user: 'Chudik',
            message: 'Hello world'
        });

        // socket.broadcast.emit('message:received2',{
        //     user: 'Chudik',
        //     message: 'Hello world'
        // });
        // socket.broadcast.emit('message:received3',{
        //     user: 'Chudik',
        //     message: 'Hello world'
        // });

        // //5 повідомлень з однакоовими текстовками
        // for (let i = 0; i < 5; i++) {
        //     const messageNumber = messageData[i];
        //
        //     socket.broadcast.emit('messageNumber', {
        //         user: 'Chudik',
        //         message: 'Hello world'
        //     });
        // }

        setTimeout(() => {
            io.emit('globalBroadcast', 'TEST SOCKET')
        }, 2000)
    });

    socket.on('room:join', (joinInfo)=>{
        socket.join(joinInfo.roomId);

        // //to all room members
        // io.to(joinInfo.roomId).emit('room:newMember', {id:socket.id});

        //to all room members except sender
        socket.to(joinInfo.roomId).emit('room:newMember', {id:socket.id})
    })

})


app.use(express.json())
app.use(express.urlencoded({extended: true})) //без того буде бачити пустий об'єкт(в консолі: {})

if (NODE_ENV !== 'prod') {
    const morgan = require('morgan')
    // app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
    app.use(morgan('dev'))
}

// app.use(cors(_configureCors()));  //cors- покриває всьо
app.use(expressFileUpload());

//cors(_configureCors()) - покриває лиш один ендпоінт як middleware
app.use('/auth', cors(_configureCors()), authRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
// app.use('/docs', swaggerUi.serve)
// app.get('/docs', swaggerUi.setup(swaggerJson))


//всі ерори злітаються сюди:
app.use((err, req, res, next) => {
    console.log(err)
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown error',
            code: err.status || 400
        })
})

app.use('*', (req, res) => {
    res.status(404).json('Route not found')
})


server.listen(5000, () => {
    console.log(`Server listen port 5000`);
    cronRun()
})

// app.get('/users', userController.getUsers)
// app.get('/users/:id',userController.getUser)
// app.post('/users',userController.postUser)
// app.delete('/users/:id',userController.deleteUser)
// app.put('/users/:id',userController.updateUser)

function _configureCors() {
    const whitelist = CORS_WHITE_LIST.split(';')

    return {
        origin: (origin, callback) => {

            // if (whitelist.indexOf(origin) !== -1) { //the same
            if (whitelist.includes(origin)) {
                return callback(null, true)
                // null - нема ерори, true - доступ дозволено
            }
            callback(new Error('Not allowed by CORS'))
        }
    }
}

