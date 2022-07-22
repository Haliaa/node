const Joi = require("joi")

const {emailValidator,passwordValidator} = require('../validators/common.validator')

module.exports = {
    login: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required()
    })
}
