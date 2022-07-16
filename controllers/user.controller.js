const userService = require("../services/user.service");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers()
            res.json(users)
        } catch (e) {
            next(e)
        }
    },
    postUsers: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body)


            res.json(newUser)
            next()
        } catch (e) {
            next(e)
        }
    },
    getUser: async (req, res, next) => {
        try {
            const {user} = req;
            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteUser({_id:id})

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateUser({_id:id},req.dateForUpdate)
            res.status(201).json(updatedUser)
        } catch (e) {
            next(e)
        }
    }
}
