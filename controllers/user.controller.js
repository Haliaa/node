const users = require('../dataBase/users');

module.exports = {
    getUsers: (req, res) => {
        try {
            res.status(201).json(users)
        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error')
        }
    },
    getUser: (req, res) => {
        try {
            const {id} = req.params
            const {model = ''} = req.query;
            const modelToFind = model.split(';')
            console.log('#######################')
            console.log(modelToFind)
            console.log('#######################')

            res.status(201).json(users[id])
        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error')
        }
    },
    postUser: (req, res) => {
        try {
            console.log(req.body);
            res.status(201).json('User was created')
        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error')
        }
    },
    deleteUser: (req, res) => {
        try {
            users.push({
                name: 'Test',
                age: Math.random() * 100
            })
            res.status(201).json('User was created')
        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error')
        }
    },
    updateUser: (req, res) => {
        try {
            users.push({
                name: 'Test',
                age: Math.random() * 100
            })
            res.status(201).json('User was created')
        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error')
        }
    }
}


