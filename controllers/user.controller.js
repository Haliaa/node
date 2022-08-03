const userService = require("../services/user.service");
const passwordService = require('../services/password.service')
const emailService = require('../services/email.service')
const smsService = require('../services/sms.service')
const smsTemplateBuilder = require('../common/smsTemplateBuilder')
const emailAction = require('../enums/emailAction.enum')
const {userPresenter} = require('../presenters/user.presenter')
const smsAction = require("../enums/smsAction.enum");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            console.log(req.query)
            const users = await userService.findUsers(req.query).exec();

            const usersForResponse = users.map(u => userPresenter(u));

            res.json(usersForResponse);
        } catch (e) {
            next(e)
        }
    },
    postUsers: async (req, res, next) => {
        try {
            const {email, password, name, phone} = req.body;
            const hash = await passwordService.hashPassword(password)
            const newUser = await userService.createUser({...req.body, password: hash})

            const sms = smsTemplateBuilder[smsAction.WELCOME](name)
            await smsService.sendSMS(phone, sms)
            await emailService.sendMail(email, emailAction.WELCOME, {name})

            const userForResponse = userPresenter(newUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e)
        }
    },
    getUser: async (req, res, next) => {
        try {
            const {user} = req;

            const userForResponse = userPresenter(user)

            res.json(userForResponse)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            await userService.deleteUser({_id: id})

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateUser({_id: id}, req.body);
            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e)
        }
    }
}
