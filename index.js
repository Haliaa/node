const express = require("express");
const {fileService} = require("./services");

const app = express();
app.use(express.json())

app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    res.json(users)
})

app.post('/users', async (req, res) => {
    const {name, age} = req.body;
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json('Set valid age')
    }
    if (!name || name.length < 3) {
        return res.status(400).json('Set valid name')
    }

    const users = await fileService.reader();
    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}

    await fileService.writer([...users, newUser])
    res.json(newUser)
})

app.get('/users/:userId', async (req, res) => {
    const users = await fileService.reader();
    const {userId} = req.params
    const user = users.find((user)=>user.id === +userId)
    if (!user) {
        return res.status(400).json(`Not found user with id ${userId}`)
    }
    res.json(user)
})

app.delete('/users/:userId', async (req, res) => {
    const users = await fileService.reader();
    const {userId} = req.params
    const user = users.findIndex((user)=>user.id === +userId);
    if (user === -1) {
        return res.status(400).json(`Not found user with id ${userId}`)
    }
    users.splice(user, 1)

    await fileService.writer(users)

    res.sendStatus(204)
})

app.put('/users/:userId', async (req, res) => {
    const {name, age} = req.body;
    const {userId} = req.params;
    if (age && !Number.isInteger(age) || age < 18) {
        return res.status(400).json('Set valid age')
    }
    if (name && name.length < 3) {
        return res.status(400).json('Set valid name')
    }

    const users = await fileService.reader();
    const userIndex = users.findIndex((user)=>user.id === +userId);

    if (userIndex === -1) {
        return res.status(400).json(`Not found user with id ${userId}`)
    }

    //{...users[userIndex], ...req.body}//the same as lower
    const updatedUser = Object.assign(users[userIndex], req.body)

    users.splice(userIndex,1)

    // const newUsersArr = [...users, {...users[userIndex], ...req.body}] //the same as lower
    // const newUsersArr = [...users, updatedUser]

    await fileService.writer([...users, updatedUser])
    res.status(201).json(updatedUser)
})


app.listen(5000, () => {
    console.log('Service is listening port 5000')
})
