const {generateAuthTokens} = require('../services/token.service')
const passwordService = require('../services/password.service')
const emailService = require('../services/email.service')
const OAuth = require('../dataBase/OAuth')
const {WELCOME} = require("../constants/emailActions.enum");

module.exports = {
    login: async (req, res, next)=>{
        try {
            const {password: hashPassword, _id,name} = req.user;
            const {password, email} = req.body; // але email-и в нас покишо рандомні набори символів

            await emailService.sendMail('galasevcik@gmail.com',WELCOME, {userName: name})
            // await emailService.sendMail(email,WELCOME) // так би мало бути по нормальному

            await passwordService.comparePassword(hashPassword, password);

            const tokens = generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens //= access_token: access_token
            })

            res.json({
                user: req.user,
                ...tokens
            })
        }catch (e) {
            next(e)
        }
    }
}
