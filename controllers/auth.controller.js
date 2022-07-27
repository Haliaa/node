const {comparePassword} = require('../services/password.service');
const {generateAuthTokens} = require('../services/token.service');
const OAuth = require('../dataBase/OAuth');
const emailService = require("../services/email.service");
const emailAction = require("../enums/emailAction.enum");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await comparePassword(hashPassword, password);

            const tokens = generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            })

            res.json({
                user: req.user,
                ...tokens
            });
        } catch (e) {
            next(e)
        }
    },
    logout: async (req, res, next) => {
        try {
            const {access_token, user} = req;
            const {name, email} = user
            await OAuth.deleteOne({access_token})

            await emailService.sendMail(email, emailAction.LOGOUT, {name, count: 1}) //count:1 logout з одного девайсу

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id, name, email} = req.user;

            const {deletedCount} = await OAuth.deleteMany({userId: _id});

            await emailService.sendMail(email, emailAction.LOGOUT, {name, count: deletedCount}) //count:1 logout з одного девайсу

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token})

            const tokens = generateAuthTokens();

            await OAuth.create({userId, ...tokens})

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const {name, email} = req.user;

            await emailService.sendMail(email, emailAction.FORGOT_PASSWORD, {name}) //count:1 logout з одного девайсу

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    }
};
