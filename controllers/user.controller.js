const User = require('../dataBase/User');
const users = require("../dataBase/users");
const CError = require('../error/CustomError')

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e)
        }
    },
    getUser: async (req, res, next) => {
        try {
            const {userId = ''} = req.params;

            if (userId.length !== 24) {       //довжина id в mongo дорівнює 24 символи
                throw new CError('User ID is not valid', 403)
            }

            // const user =  await User.findById(userId)
            const user = await User.findOne({_id: userId})

            if (!user) {
                throw new CError(`User with Id ${userId} is not found`, 404)
            }
            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    postUser: async (req, res, next) => {
        try {
            const user = await User.create(req.body)
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userId = ''} = req.params;
            await User.deleteOne({_id: userId})
            res.status(201).json('User was deleted')
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            res.status(201).json('Users was created');
        } catch (e) {
            next(e)
        }
    }
}


