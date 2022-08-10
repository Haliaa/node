const {Types} = require("mongoose")
const CError = require('../errors/CustomError')

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;

            if (!Types.ObjectId.isValid(id)) {
                return next(new CError('Not valid ID'))
            }
            next()
        } catch (e) {
            next(e)
        }
    },
    isDateValid: (validationScheme, dataType = 'body') => async (req, res, next) => {
        try {
            const {error, value} = validationScheme.validate(req[dataType]);

            if (error) {
                return next(new CError(error.details[0].message))
            }

            req[dataType] = value;
            next()
        } catch (e) {
            next(e)
        }
    }
}
