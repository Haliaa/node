const User = require('../dataBase/User');
const CError = require('../error/CustomError')
const {uploadFile} = require("../services/s3.service");
const userService = require("../services/user.service");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const paginationResponse = await userService.getUsersWithPagination(req.query)

            res.json(paginationResponse);
        } catch (e) {
            next(e)
        }
    },
    getUser: async (req, res, next) => {
        try {
            const {userId = ''} = req.params;

            if (userId.length !== 24) {       //довжина id в mongo дорівнює 24 символи
                // noinspection ExceptionCaughtLocallyJS
                throw new CError('User ID is not valid', 403)
            }

            // const user =  await User.findById(userId)
            const user = await User.findOne({_id: userId})

            if (!user) {
                // noinspection ExceptionCaughtLocallyJS
                throw new CError(`User with Id ${userId} is not found`, 404)
            }
            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    postUser: async (req, res, next) => {
        try {

            // console.log('------------');
            // console.log(req.files); //виводить то що ви передаємо в постмані
            // console.log('------------');


            // const hashedPassword = await hashPassword(req.body.password);
            const user = await User.createWithHashPassword(req.body);

            const {Location} = await uploadFile(req.files.userAvatar, 'user', user._id); //шлях картинки

            const userWithPhoto = await User.findByIdAndUpdate(user._id, {avatar: Location}, {new: true})

            res.status(201).json(userWithPhoto)
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


