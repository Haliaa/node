const {generateAuthTokens, generateActionToken} = require('../services/token.service')
const passwordService = require('../services/password.service')
const emailService = require('../services/email.service')
const OAuth = require('../dataBase/OAuth')
const ActionTokens = require('../dataBase/ActionTokens')
const User = require('../dataBase/User')
const {WELCOME, FORGOT_PASSWORD} = require("../constants/emailActions.enum");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {_id, name} = req.user;
            const {password, email} = req.body; // але email-и в нас покишо рандомні набори символів

            // await emailService.sendMail('galasevcik@gmail.com', WELCOME, {userName: name})
            // await emailService.sendMail(email,WELCOME) // так би мало бути по нормальному

            await req.user.comparePasswords(password);

            const tokens = generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens //= access_token: access_token
            })

            res.json({
                user: req.user,
                ...tokens
            })
        } catch (e) {
            next(e)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id, name} = req.user;

            const token = generateActionToken(FORGOT_PASSWORD, {name, _id});

            await ActionTokens.create({
                userId: _id,
                token,
                actionType: FORGOT_PASSWORD
            })
            await emailService.sendMail(
                'galasevcik@gmail.com',
                FORGOT_PASSWORD,
                {userName: name, token})

            res.json('Ok')
        } catch (e) {
            next(e)
        }
    },
    setForgotPassword: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {password} = req.body;

            const hashPassword = await passwordService.hashPassword(password)
            const updatedUser = await User.findByIdAndUpdate(_id, {password: hashPassword}, {new:true});
            //{new:true} - повернути оновлений варіант

            await ActionTokens.deleteOne({actionType: FORGOT_PASSWORD, userId:_id})

            res.json(updatedUser)
        } catch (e) {
            next(e)
        }
    },

}
