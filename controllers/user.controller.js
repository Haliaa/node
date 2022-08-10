const userService = require("../services/user.service");
const passwordService = require('../services/password.service')
const emailService = require('../services/email.service')
const smsService = require('../services/sms.service')
const s3Service = require('../services/s3.service')
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
            const user = await userService.createUser({...req.body, password: hash})

            const {Location} = await s3Service.uploadFile(req.files.avatar, 'user', user._id)

            const userWithPhoto = await userService.updateUser({_id: user._id}, {avatar: Location})

            const sms = smsTemplateBuilder[smsAction.WELCOME](name)

            //якщо хоч один буде поганий(rejected) то все завалиться↓
            // Promise.all()

            //Відпрацює навіть якщо всі будуть погані(rejected)↓
            await Promise.allSettled([
                smsService.sendSMS(phone, sms),
                emailService.sendMail(email, emailAction.WELCOME, {name})
            ])

            //погана практика, бо двоє сервісів можуть запускатись одночасно, а не чекати своєї черги
            // await smsService.sendSMS(phone, sms) //sms-sender
            // await emailService.sendMail(email, emailAction.WELCOME, {name})

            const userForResponse = userPresenter(userWithPhoto);

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

            await userService.deleteUser({_id: id});

            if(req.user.avatar){
                await s3Service.deleteFile(req.user.avatar)
            }

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            if (req.files?.avatar) {
                if (req.user.avatar) {
                    const {Location} = await s3Service.updateFile(req.files.avatar, req.user.avatar);
                    req.body.avatar = Location
                }

                const {Location} = await s3Service.uploadFile(req.files.avatar, 'user', id)
                req.body.avatar = Location
            }


            const updatedUser = await userService.updateUser({_id: id}, req.body);
            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e)
        }
    }
}
