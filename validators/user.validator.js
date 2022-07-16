const Joi = require("joi")
const {PASSWORD_REGEX} = require('../constants/constant')
const {emailValidator} = require('../validators/share')

const userSubSchema = {
    name: Joi.string().alphanum().min(2).max(100).required(),
    age: Joi.number().integer().min(1).max(130),
}

const testArraySubSchema = Joi.object({
            car: Joi.boolean()
        })

module.exports = {
    newUserValidator: Joi.object({
        ...userSubSchema,
        email: emailValidator.required(),
        password: Joi.string().regex(PASSWORD_REGEX).required()
    }),
    updateUserValidator: Joi.object(userSubSchema),
    testValid: Joi.object({
        // array: Joi.array().items(Joi.string(), Joi.number())
        isAdult: Joi.boolean(),
        array: Joi.array().items(testArraySubSchema).when('isAdult',{is:true, then: Joi.required()})
    })
}
