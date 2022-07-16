const CError = require('../errors/CustomError');
const userService = require('../services/user.service');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params
            const user = await userService.findUser({_id: id})
            if (!user) {
                return next(new CError('User not found'))
            }

            req.user = user;
            next()
        } catch (e) {
            next(e)
        }
    },
    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findUser({email})
            if (user) {
                return next(new CError(`User with email ${email} already exists`, 409))
            }

            req.user = user;
            next()
        } catch (e) {
            next(e)
        }
    },
    isUserValidForPost: async (req, res, next) => {
        try {
            const {name, email, age, password} = req.body;
            if (!age || !Number.isInteger(age) || age < 18) {
                return next(new CError('Set valid age'))
            }
            if (!name || name.length < 3) {
                return next(new CError('Set valid name'))
            }
            if (!email || !email.includes('@')) {
                return next(new CError('Set valid email'))
            }
            if (!password || password.length < 5) {
                return next(new CError('Set valid password'))
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {name, age} = req.body;
           if (age && !Number.isInteger(age) || age < 18) {
                next(new CError('Set valid age'))
            }
            if (name && name.length < 3) {
                return res.status(400).json('Set valid name')
            }
            req.dateForUpdate = {name, age}

            next()
        } catch (e) {
            next(e)
        }
    }
}
