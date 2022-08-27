const Joi = require("joi");

//v0 npm-packageFirst
// const {EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX} = require("npm-package-myfirst1233t/constants/regex");

//v1 npm-packageFirst
const {EMAIL_REGEX, PASS_REGEX, PHONE_REGEX} = require("npm-package-myfirst1233t/constants/regex");

// const {EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX} = require("../constants/constant");

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(100),
    ageValidator: Joi.number().integer().min(1).max(130),
    emailValidator: Joi.string().regex(EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().regex(PASS_REGEX).trim(),
    phoneValidator: Joi.string().regex(PHONE_REGEX).trim()
}
