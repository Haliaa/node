const Joi = require("joi")

const {emailValidator,passwordValidator, phoneValidator, nameValidator, ageValidator} = require('../validators/common.validator')

module.exports = {
    newUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        phone: phoneValidator.required()
    }),
    updateUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator
    })
}
