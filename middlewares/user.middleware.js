const CError = require('../errors/CustomError');
const userService = require('../services/user.service');
const userValidator = require('../validators/user.validator');
const queryValidator = require('../validators/query.validaor');

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
            const {error, value} = userValidator.newUserValidator.validate(req.body);
            if (error) {
                return next(new CError(error.details[0].message))
            }
            req.body = value;
            next()
        } catch (e) {
            next(e)
        }
    },
    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);
            if (error) {
                return next(new CError(error.details[0].message))
            }
            req.body = value;
            next()
        } catch (e) {
            next(e)
        }
    },
    isUserQueryValid: async (req, res, next) => {
        try {
            const {error, value} = queryValidator.findAll.validate(req.query);

            if (error) {
                return next(new CError(error.details[0].message))
            }

            req.query = value;
            next()
        } catch (e) {
            next(e)
        }
    }
}
